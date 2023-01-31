package de.neuefische.backend.customer;

import de.neuefische.backend.appUser.AppUser;
import de.neuefische.backend.appUser.AppUserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;

@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class CustomerServiceTest {

    @Test
    void create_whenAppUserCreate_returnCustomer(){
        //given
       AppUser appUser = new AppUser(
               "1",
               "maik",
               "123");
       Customer customer = new Customer(
               "5",
               "Maik",
               "Popowicz",
               "Musterweg",
               "20001",
               1234567890,
               "",
               5000,
               "",
               "",
               "",
               ""
       );
       CustomerRepository customerRepository = mock(CustomerRepository.class);

       AppUserService appUserService = mock(AppUserService.class);

       CustomerService customerService = new CustomerService(customerRepository,appUserService);

       when(appUserService.getAuthenticatedUser()).thenReturn(appUser);
       when(customerRepository.save(customer)).thenReturn(customer);
        //when
        Customer actual = customerService.create(customer);

        Customer expect = new Customer(
                "5",
                "Maik",
                "Popowicz",
                "Musterweg",
                "20001",
                1234567890,
                "OPEN",
                5000,
                "",
                "",
                "",
                "1"
        );
        //then
        Assertions.assertEquals(actual,expect);

        verify(customerRepository).save(customer);
    }

    @Test
    void getAll_whenCustomerListIsEmpty_thenReturnEmptyArrayList(){
        //given
        AppUser appUser = new AppUser(
                "1",
                "maik",
                "123"
        );
        List<Customer> customers = new ArrayList<>();

        CustomerRepository customerRepository = mock(CustomerRepository.class);

        AppUserService appUserService = mock(AppUserService.class);

        CustomerService customerService = new CustomerService(customerRepository,appUserService);

        when(appUserService.getAuthenticatedUser()).thenReturn(appUser);
        when(customerRepository.findAll()).thenReturn(customers);
        //when
        List<Customer> actual= customerService.getAll();

        List<Customer> expected = new ArrayList<>();
        //then
        Assertions.assertEquals(actual,expected);

    }

    @Test
    void getAll_whenCustomerListHasCustomer_thenReturnCustomerWithSameCreatedByID(){
        //given
        AppUser appUser = new AppUser(
                "1",
                "maik",
                "123"
        );
        List<Customer> customers = new ArrayList<>(List.of(
                new Customer(
                        "5",
                        "Dennis",
                        "La",
                        "MusterStraße",
                        "2009",
                        10000,
                        "",
                        500,
                        "",
                        "",
                        "",
                        "1"),
                new Customer("6",
                        "uwe",
                        "La",
                        "MusterStraße",
                        "2009",
                        1005,
                        "",
                        54,
                        "",
                        "",
                        "",
                        "1")
        ));

        CustomerRepository customerRepository = mock(CustomerRepository.class);
        AppUserService appUserService = mock(AppUserService.class);
        CustomerService customerService = new CustomerService(customerRepository,appUserService);

        when(appUserService.getAuthenticatedUser()).thenReturn(appUser);
        when(customerRepository.findAllByCreatedBy(appUser.getId())).thenReturn(customers);
        //when
        List<Customer> actual = customerService.getAll();

        List<Customer> expected = new ArrayList<>(List.of(
                new Customer(
                        "5",
                        "Dennis",
                        "La",
                        "MusterStraße",
                        "2009",
                        10000,
                        "",
                        500,
                        "",
                        "",
                        "",
                        "1"),
                new Customer(
                        "6",
                        "uwe",
                        "La",
                        "MusterStraße",
                        "2009",
                        1005,
                        "",
                        54,
                        "",
                        "",
                        "",
                        "1")
                )
        );
        //then
        Assertions.assertEquals(actual,expected);

        Mockito.verify(customerRepository).findAllByCreatedBy("1");
    }

    @Test
    void findByID_WhenAppUserGiveCustomerIDThatNotExist_FindCustomerById(){
        //given
        CustomerRepository customerRepository = mock(CustomerRepository.class);
        AppUserService appUserService = mock(AppUserService.class);
        CustomerService customerService = new CustomerService(customerRepository,appUserService);

        when(customerRepository.findById("5")).thenReturn(Optional.empty());

        //when
        Optional<Customer> actual = customerService.findByID("5");
        //then
        Assertions.assertEquals(actual,Optional.empty());

        verify(customerRepository).findById("5");
    }
    @Test
    void Delete_DeleteWhenAppUserGiveID_thenReturnVoid(){
        //given
        CustomerRepository customerRepository = mock(CustomerRepository.class);
        AppUserService appUserService = mock(AppUserService.class);
        CustomerService customerService = new CustomerService(customerRepository,appUserService);

        Mockito.doNothing().when(customerRepository).deleteById("1");
        //when
        customerService.deleteById("1");
        //then
        verify(customerRepository).deleteById("1");
    }
    @Test
    void setStatus_setStatusFromCustomerToAssumend_AndReturnCustomer(){
        Customer customer = new Customer(
                "5",
                "Dennis",
                "La",
                "MusterStraße",
                "2009",
                10000,
                CustomerStatus.OPEN,
                500,
                "",
                "",
                "",
                "1");

        Customer expect = new Customer(
                "5",
                "Dennis",
                "La",
                "MusterStraße",
                "2009",
                10000,
                CustomerStatus.ASSUMED,
                500,
                "",
                "",
                "",
                "1");

        CustomerRepository customerRepository = mock(CustomerRepository.class);
        AppUserService appUserService = mock(AppUserService.class);
        CustomerService customerService = new CustomerService(customerRepository,appUserService);

        when(customerRepository.save(customer)).thenReturn(expect);

        Customer actual = customerService.setStatusAssumed(customer);

        Assertions.assertEquals(actual,expect);

        verify(customerRepository).save(customer);
    }
    @Test
    void setStatus_setStatusFromCustomerToDeclined_AndReturnCustomer() {
        Customer customer = new Customer(
                "5",
                "Dennis",
                "La",
                "MusterStraße",
                "2009",
                10000,
                CustomerStatus.OPEN,
                500,
                "",
                "",
                "",
                "1");

        Customer expect = new Customer(
                "5",
                "Dennis",
                "La",
                "MusterStraße",
                "2009",
                10000,
                CustomerStatus.DECLINED,
                500,
                "",
                "",
                "",
                "1");

        CustomerRepository customerRepository = mock(CustomerRepository.class);
        AppUserService appUserService = mock(AppUserService.class);
        CustomerService customerService = new CustomerService(customerRepository, appUserService);

        when(customerRepository.save(customer)).thenReturn(expect);

        Customer actual = customerService.setStatusDeclined(customer);

        Assertions.assertEquals(actual, expect);

        verify(customerRepository).save(customer);
    }
}