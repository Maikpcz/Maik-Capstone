package de.neuefische.backend.customer;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;


@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)

class CustomerControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void getAll_whenAppUserNotLoggedIn_thenReturn401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/customers"))
                .andExpectAll(
                        MockMvcResultMatchers.status().isUnauthorized()
                );
    }


    @Test
    @WithMockUser(username = "maik",password = "123",roles = "BASIC")
    void getAll_whenAppUserLoggedIn_thenReturn200() throws Exception {
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

                mockMvc.perform(MockMvcRequestBuilders.get("/api/customers"))
                .andExpectAll(
                        MockMvcResultMatchers.status().isOk()
                );
    }

    // FindBy Methode
    @Test
    @WithMockUser
    void FindById_whenAppUserIsLoggedLookingForCustomerWithId_thenReturn200() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/customers/1"))
                .andExpectAll(
                        MockMvcResultMatchers.status().isOk()
                );
    }
    @Test
    void FindById_whenAppUserIsNotLoggedLookingForCustomerWithId_thenReturn401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/customers/1"))
                .andExpectAll(
                        MockMvcResultMatchers.status().isUnauthorized()
                );
    }

    //create Methode
    @Test
    @WithMockUser(username = "maik",password = "123")
    void create_whenAppUserIsLogged_thenReturn200() throws Exception {
        //Man muss sich erstmal sich ein App User erstellen damit sich der MockUser einloggen!!!!
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
        mockMvc.perform(MockMvcRequestBuilders.post("/api/customers")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                           {
                           "id": "1",
                           "firstname": "maik",
                           "surname": "popowicz",
                           "address": "Musterstraße",
                           "postalCode": "20001",
                           "status": "",
                           "credit": 5000,
                           "reason": "",
                           "description": "",
                           "notes": "",
                           "createdBy": "1"
                            }
                            """)).andExpectAll(
                MockMvcResultMatchers.status().isOk(),
                MockMvcResultMatchers.content().json("""
                                              {
                                              "id": "1",
                                              "firstname": "maik",
                                              "surname": "popowicz",
                                               "address": "Musterstraße",
                                               "postalCode": "20001",
                                               "status": "OPEN",
                                               "credit": 5000,
                                               "reason": "",
                                               "description": "",
                                               "notes": "",
                                               "createdBy": "1"
                                              }
                                              """)
        );
    }
    @Test
    void create_whenAppUserIsNotLogged_thenReturn401() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/costumors")).
                andExpectAll(MockMvcResultMatchers.status().isUnauthorized());
    }
    @Test
    void Delete_whenAppUserNotLogged_thenReturn401() throws Exception {
            mockMvc.perform(MockMvcRequestBuilders.delete("/api/customers/5"))
                    .andExpectAll(
                            MockMvcResultMatchers.status().isUnauthorized()
                    );
    }
    @Test
    @WithMockUser(username = "maik",password = "123")
    void Delete_whenAppUserIsLoggedAndIs_thenReturn200() throws Exception {
        //Man muss sich erstmal sich ein App User erstellen damit sich der MockUser einloggen!!!!
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
        mockMvc.perform(MockMvcRequestBuilders.post("/api/customers")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                           {
                           "id": "1",
                           "firstname": "maik",
                           "surname": "popowicz",
                           "address": "Musterstraße",
                           "postalCode": "20001",
                           "status": "",
                           "credit": 5000,
                           "reason": "",
                           "description": "",
                           "notes": "",
                           "createdBy": "1"
                            }
                            """)).andExpectAll(
                MockMvcResultMatchers.status().isOk(),
                MockMvcResultMatchers.content().json("""
                                              {
                                              "id": "1",
                                              "firstname": "maik",
                                              "surname": "popowicz",
                                               "address": "Musterstraße",
                                               "postalCode": "20001",
                                               "status": "OPEN",
                                               "credit": 5000,
                                               "reason": "",
                                               "description": "",
                                               "notes": "",
                                               "createdBy": "1"
                                              }
                                              """)
        );
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/customers/1"))
                .andExpectAll(MockMvcResultMatchers.status().isOk());
    }
    @Test
    @WithMockUser(username = "maik",password = "123")
    void setStatusAssumend_whenAppUserIsLoggedAndIs_thenReturn200() throws Exception {
        //Man muss sich erstmal sich ein App User erstellen damit sich der MockUser einloggen!!!!
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
        mockMvc.perform(MockMvcRequestBuilders.post("/api/customers")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                           {
                           "id": "1",
                           "firstname": "maik",
                           "surname": "popowicz",
                           "address": "Musterstraße",
                           "postalCode": "20001",
                           "status": "",
                           "credit": 5000,
                           "reason": "",
                           "description": "",
                           "notes": "",
                           "createdBy": "1"
                            }
                            """)).andExpectAll(
                MockMvcResultMatchers.status().isOk(),
                MockMvcResultMatchers.content().json("""
                                              {
                                              "id": "1",
                                              "firstname": "maik",
                                              "surname": "popowicz",
                                               "address": "Musterstraße",
                                               "postalCode": "20001",
                                               "status": "OPEN",
                                               "credit": 5000,
                                               "reason": "",
                                               "description": "",
                                               "notes": "",
                                               "createdBy": "1"
                                              }
                                              """)
        );
        mockMvc.perform(MockMvcRequestBuilders.post("/api/customers/status/assumed").contentType(MediaType.APPLICATION_JSON)
                .content("""
                           {
                           "id": "1",
                           "firstname": "maik",
                           "surname": "popowicz",
                           "address": "Musterstraße",
                           "postalCode": "20001",
                           "status": "OPEN",
                           "credit": 5000,
                           "reason": "",
                           "description": "",
                           "notes": "",
                           "createdBy": "1"
                            }
                            """)).andExpectAll(
                MockMvcResultMatchers.status().isOk(),
                MockMvcResultMatchers.content().json("""
                                              {
                                              "id": "1",
                                              "firstname": "maik",
                                              "surname": "popowicz",
                                               "address": "Musterstraße",
                                               "postalCode": "20001",
                                               "status": "ASSUMED",
                                               "credit": 5000,
                                               "reason": "",
                                               "description": "",
                                               "notes": "",
                                               "createdBy": "1"
                                              }
                                              """)
        );
        }
    @Test
    @WithMockUser(username = "maik",password = "123")
    void setStatusDeclined_whenAppUserIsLoggedAndIs_thenReturn200() throws Exception {
        //Man muss sich erstmal sich ein App User erstellen damit sich der MockUser einloggen!!!!
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
        mockMvc.perform(MockMvcRequestBuilders.post("/api/customers")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                           {
                           "id": "1",
                           "firstname": "maik",
                           "surname": "popowicz",
                           "address": "Musterstraße",
                           "postalCode": "20001",
                           "status": "",
                           "credit": 5000,
                           "reason": "",
                           "description": "",
                           "notes": "",
                           "createdBy": "1"
                            }
                            """)).andExpectAll(
                MockMvcResultMatchers.status().isOk(),
                MockMvcResultMatchers.content().json("""
                                              {
                                              "id": "1",
                                              "firstname": "maik",
                                              "surname": "popowicz",
                                               "address": "Musterstraße",
                                               "postalCode": "20001",
                                               "status": "OPEN",
                                               "credit": 5000,
                                               "reason": "",
                                               "description": "",
                                               "notes": "",
                                               "createdBy": "1"
                                              }
                                              """)
        );
        mockMvc.perform(MockMvcRequestBuilders.post("/api/customers/status/declined").contentType(MediaType.APPLICATION_JSON)
                .content("""
                           {
                           "id": "1",
                           "firstname": "maik",
                           "surname": "popowicz",
                           "address": "Musterstraße",
                           "postalCode": "20001",
                           "status": "OPEN",
                           "credit": 5000,
                           "reason": "",
                           "description": "",
                           "notes": "",
                           "createdBy": "1"
                            }
                            """)).andExpectAll(
                MockMvcResultMatchers.status().isOk(),
                MockMvcResultMatchers.content().json("""
                                              {
                                              "id": "1",
                                              "firstname": "maik",
                                              "surname": "popowicz",
                                               "address": "Musterstraße",
                                               "postalCode": "20001",
                                               "status": "DECLINED",
                                               "credit": 5000,
                                               "reason": "",
                                               "description": "",
                                               "notes": "",
                                               "createdBy": "1"
                                              }
                                              """)
        );
    }
}