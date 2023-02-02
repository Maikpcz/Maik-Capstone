package de.neuefische.backend.file;

import de.neuefische.backend.appuser.AppUserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class FileControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private FileService fileService;

    @Test
    void save_WhenUserIsNotLogin_ThenReturn401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/files")).
                andExpectAll(MockMvcResultMatchers.status().isUnauthorized()
                );
    }

    @Test
    @WithMockUser
    void save_WhenUserIsUploadAEmptyFile_ReturnBadRequest() throws Exception {

        MockMultipartFile mockMultipartFile = new MockMultipartFile(
                "data",
                "filename.txt",
                "multipart/form-data",
                new byte[0]);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/app-users")
                        .contentType(MediaType.APPLICATION_JSON).content(
                                """
                                {
                                "id": "1",
                                "username": "maik",
                                "password": "123"
                                }
                                """)).andExpectAll(MockMvcResultMatchers.status().isOk()).
                andExpect(MockMvcResultMatchers.content().json("""
                                                {
                                                "id": "1",
                                                "username": "maik",
                                                "password": ""
                                                }
                                                """));
        mockMvc.perform(MockMvcRequestBuilders.post("/api/files").contentType(
                MediaType.MULTIPART_FORM_DATA).content(String.valueOf(mockMultipartFile))).
                andExpectAll(MockMvcResultMatchers.status().isBadRequest());
    }
    @Test
    @WithMockUser
    void save_whenUserIsLoginAndFileIsValid_thenReturnIsOK() throws Exception {
        MockMultipartFile mockMultipartFile = new MockMultipartFile(
                "file",
                "filename.txt",
                "multipart/form-data",
                "some xml".getBytes());
        String expectedJson = ("""
                {
                "id": "5",
                "fileName": "filename.txt",
                "contentType": "multipart/form-data",
                "size": 5,
                "createdBy": "1"
                }
                """);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/app-users")
                        .contentType(MediaType.APPLICATION_JSON).content(
                                """
                                {
                                "id": "1",
                                "username": "maik",
                                "password": "123"
                                }
                                """)).andExpectAll(MockMvcResultMatchers.status().isOk()).
                andExpect(MockMvcResultMatchers.content().json("""
                                                {
                                                "id": "1",
                                                "username": "maik",
                                                "password": ""
                                                }
                                                """));
        mockMvc.perform(MockMvcRequestBuilders.multipart("/api/files")
                        .file(mockMultipartFile)
                        .param("some-random","4")
                        .contentType(
                        MediaType.MULTIPART_FORM_DATA).content(expectedJson))
                .andExpectAll(MockMvcResultMatchers.status().isOk());
    }
}