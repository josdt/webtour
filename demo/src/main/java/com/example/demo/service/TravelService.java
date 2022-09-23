package com.example.demo.service;

import com.example.demo.controller.FilesController;
import com.example.demo.model.*;

import com.example.demo.model.composite.CustomerTourKey;
import com.example.demo.model.composite.PlaceTourKey;
import com.example.demo.model.composite.ServiceTourkey;
import com.example.demo.model.composite.VehicleTourKey;
import com.example.demo.model.input.*;
import com.example.demo.model.repository.*;
import com.example.demo.model.travelEnum.ActiveStatus;
import com.example.demo.storage.FilesStorageService;
import com.example.demo.storage.FilesStorageServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TravelService {

    @Autowired
    AskRepository askRepository;

    @Autowired
    BookingRepository bookingRepository;

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    PlaceRepository placeRepository;

    @Autowired
    PlaceTourRepository placeTourRepository;

    @Autowired
    ServiceRepository serviceRepository;

    @Autowired
    ServiceTourRepository serviceTourRepository;

    @Autowired
    TourRepository tourRepository;

    @Autowired
    VehicleRepository vehicleRepository;

    @Autowired
    VehicleTourRepository vehicleTourRepository;

    @Autowired
    FilesStorageServiceImpl filesStorageService;

    //Ask
    public List<Ask> getAskByIdTour(String idTour){
        return askRepository.getAskByIdTour(idTour);
    }

    public Ask createAsk(AskInput input){
        Ask checkAsk= askRepository.getAskByIdTourAndIdCustomer(input.getIdTour(),input.getIdCustomer());
        if (checkAsk != null){
            return null;
        }
        Ask ask= new Ask();
        Tour checkTour= getTourById(input.getIdTour());
        Customer checkCustomer= getCustomerById(input.getIdCustomer());
        if (checkTour == null || checkCustomer == null){
            return null;
        }
        ask.setIdTour(input.getIdTour());
        ask.setIdCustomer(input.getIdCustomer());
        ask.setQuestion(input.getQuestion());
        ask.setAnswer(null);

        return askRepository.save(ask);
    }

    public Ask updateAsk(AskInput input){
        Ask ask= askRepository.getAskByIdTourAndIdCustomer(input.getIdTour(), input.getIdCustomer());

        if (ask != null){
            if (input.getQuestion() != null){
                ask.setQuestion(input.getQuestion());
                return askRepository.save(ask);
            }
        }
        return null;
    }

    public Ask updateAnswer(String idEmp, AnswerInput input){
        Employee checkEmp = getEmployeeById(idEmp);
        if (checkEmp.getRole().equals("admin")){
            Ask ask= askRepository.getAskByIdTourAndIdCustomer(input.getIdTour(), input.getIdCustomer());

            if (ask != null){
                if (input.getAnswer() != null){
                    ask.setAnswer(input.getAnswer());
                    return askRepository.save(ask);
                }
            }
        }
        return null;


    }

    public String deleteAsk(String idEmp, String idTour, Integer idCustomer){
        Employee checkEmp = getEmployeeById(idEmp);
        if (checkEmp.getRole().equals("admin")){
            Ask ask= askRepository.getAskByIdTourAndIdCustomer(idTour,idCustomer);
            if (ask == null){
                return "Ask not exist";
            }
            askRepository.deleteByIdTourAndIdCustomer(idTour, idCustomer);
            return "Deleted";
        }
        return null;

    }

    //Booking
    public List<Booking> getBookingByIdTour(String idTour){
        return bookingRepository.getBookingByIdTour(idTour);
    }

    public List<Booking> getBookingByIdCustomer(int idCustomer){
        return bookingRepository.getBookingByIdCustomer(idCustomer);
    }

    public BookingDetail getBookingDetail(String idTour, int idCustomer){
        BookingDetail bookingDetail= new BookingDetail();

        Booking booking= bookingRepository.getBookingByIdTourAndIdCustomer(idTour, idCustomer);
        Optional<Tour> tour= tourRepository.findById(idTour);
        Optional<Customer> customer= customerRepository.findById(idCustomer);

        if (booking == null || tour.isEmpty() || customer.isEmpty()){
            return null;
        }
        bookingDetail.setBooking(booking);
        bookingDetail.setTour(tour.get());
        bookingDetail.setCustomer(customer.get());

        return bookingDetail;
    }

    public Booking createBooking(BookingCreateInput input){
        Booking checkBooking= bookingRepository.getBookingByIdTourAndIdCustomer(input.getIdTour(),Integer.parseInt(input.getIdCustomer()));
        if (checkBooking != null){
            return null;
        }
        Booking booking= new Booking();

        booking.setIdCustomer(Integer.parseInt(input.getIdCustomer()));
        booking.setIdTour(input.getIdTour());
        booking.setDateBooking(new Date());
        booking.setQuantityPeople(Integer.parseInt(input.getQuantityPeople()));
        booking.setTotalPrice(Integer.parseInt(input.getQuantityPeople())* getTourById(input.getIdTour()).getPrice());
        booking.setJudge("chưa đánh giá");

        return bookingRepository.save(booking);
    }

    public Booking updateBookingJudge(JudgeInput input){
        Booking booking= bookingRepository.getBookingByIdTourAndIdCustomer(input.getIdTour(), input.getIdCustomer());
        if (booking != null){
            if (input.getJudge() != null){
                booking.setJudge(input.getJudge());

                bookingRepository.save(booking);
            }
        }
        return null;
    }

    public String deleteBooking( String idEmp,CustomerTourKey id){
        Employee checkEmp = getEmployeeById(idEmp);
        if (checkEmp.getRole().equals("admin")){
            bookingRepository.deleteById(id);
            return "Deleted";
        }
        return null;
    }

    //Customer
    public List<Customer> getAllCustomer(){
        return customerRepository.findAll();
    }

    public Customer getCustomerById(int id){
        Optional<Customer> customer= customerRepository.findById(id);
        if (customer.isEmpty()){
            return null;
        }
        return customer.get();
    }

    public List<Customer> getListCustomerByIdTour(String idTour){
        List<Booking> bookings= getBookingByIdTour(idTour);
        List<Customer> customerList= new ArrayList<>();
        for (Booking k: bookings) {
            Customer customer= getCustomerById(k.getIdCustomer());
            customerList.add(customer);
        }
        return customerList;
    }

    public Customer createCustomer(CustomerInput input){
        if (customerRepository.getCustomerByPhone(input.getPhone()) != null){
            return null;
        }
        Customer customer= new Customer();

        customer.setName(input.getName());
        customer.setGender(input.getGender());
        customer.setEmail(input.getEmail());
        customer.setPhone(input.getPhone());
        customer.setPassword(input.getPassword());
        customer.setStatus(ActiveStatus.Active);

        customerRepository.save(customer);

        return customerRepository.getCustomerByPhone(input.getPhone());
    }

    public Customer updateCustomer(int id, CustomerInput input){
        Customer customer= getCustomerById(id);

        if (customer != null){
            if (input.getName() != null) customer.setName(input.getName());
            if (input.getGender() != null) customer.setGender(input.getGender());
            if (input.getEmail() != null) customer.setEmail(input.getEmail());
            if (input.getPhone() != null) customer.setPhone(input.getPhone());
            if (input.getPassword() != null) customer.setPassword(input.getPassword());

            return customerRepository.save(customer);
        }
        return null;
    }

    public Customer blockCustomer( int idCustomer){
            Customer customer= getCustomerById(idCustomer);
            if (customer != null){
                customer.setStatus(ActiveStatus.Inactive);
                return customerRepository.save(customer);
            }
        return null;
    }

    public Customer unblockCustomer(int idCustomer){
        Customer customer= getCustomerById(idCustomer);

        if (customer != null){
            customer.setStatus(ActiveStatus.Active);
            return customerRepository.save(customer);
        }
        return null;
    }

    public String deleteCustomer(int id){
        Customer customerCheck= getCustomerById(id);
        if (customerCheck != null){
            customerRepository.deleteById(id);
            return "Deleted";
        }
        return "Customer not exist";
    }

    public Customer loginCustomer(String phone, String pass){
        Customer customer= customerRepository.checkLogin(phone, pass);
        if (customer.getIdCustomer() >0){
            return customer;
        }
        return null;
    }

    //Employee
    public List<Employee> getAllEmployee(){
        return employeeRepository.findAll();
    }

    public Employee getEmployeeById(String id){
        Optional<Employee> employee= employeeRepository.findById(id);
        if (employee.isEmpty()){
            return null;
        }
        return employee.get();
    }

    public Employee createEmployee(String idEmp, EmployeeCreateInput input){
        Employee empCheck = getEmployeeById(idEmp);
        if (empCheck.getRole().equals("admin")){
            Employee checkEmployee= getEmployeeById(input.getIdEmployee());
            if (checkEmployee != null){
                return null;
            }
            if (employeeRepository.getEmployeeByPhone(input.getPhone()) != null){
                return null;
            }
            Employee employee = new Employee();

            employee.setIdEmployee(input.getIdEmployee());
            employee.setName(input.getName());
            employee.setAddress(input.getAddress());
            employee.setEmail(input.getEmail());
            employee.setPhone(input.getPhone());
            employee.setPassword(input.getPassword());
            employee.setRole(input.getRole());

            return employeeRepository.save(employee);
        }
        return null;

    }

    public Employee updateEmployee(String idEmp, EmployeeUpdateInput input){
        Employee empCheck = getEmployeeById(idEmp);
        if (empCheck.getRole().equals("admin")){
            Employee employee = getEmployeeById(input.getIdEmployee());

            if (employee != null){
                if (input.getName() != null) employee.setName(input.getName());
                if (input.getAddress() != null )employee.setAddress(input.getAddress());
                if (input.getEmail() != null) employee.setEmail(input.getEmail());

                return employeeRepository.save(employee);
            }
        }
        return null;
    }

    public Employee loginEmployee(String phone, String pass){
        Employee employee= employeeRepository.checkLogin(phone, pass);
        if (employee.getIdEmployee().equals("")){
            return null;
        }
        return employee;
    }

    public Employee changeEmployeePassword(ChangePassInput input){
        LoginInput input1= new LoginInput();
        input1.setPhone(input.getPhone());
        input1.setPassword(input.getPassword());
        Employee employee= loginEmployee(input1.getPhone(), input1.getPassword());
        if (employee == null){
            return null;
        }
        employee.setPassword(input.getNewPass());

        return employeeRepository.save(employee);
    }

    public String deleteEmployee(String idEmp, String id){
        Employee empCheck = getEmployeeById(idEmp);
        if (empCheck.getRole().equals("admin")){
            Employee employeeCheck= getEmployeeById(id);

            if (employeeCheck != null){
                employeeRepository.deleteById(id);
                return "Deleted";
            }
            return "Employee not exist";
        }
        return null;
    }

    //Place
    public List<Place> getAllPlace(){
        return placeRepository.findAll();
    }

    public Place getPlaceById(String id){
        Optional<Place> place= placeRepository.findById(id);
        if (place.isEmpty()){
            return null;
        }
        return place.get();
    }

    public Place createPlace(String idEmp,PlaceCreateInput input){
        Employee empCheck = getEmployeeById(idEmp);
        if (empCheck.getRole().equals("admin")){
            Place checkPlace= getPlaceById(input.getIdPlace());
            if (checkPlace != null){
                return null;
            }

            Place place = new Place();

            place.setIdPlace(input.getIdPlace());
            place.setName(input.getName());
            place.setImage(input.getImage());

            return placeRepository.save(place);
        }
        return null;
    }

    public Place updatePlace(String idEmp, Place input){
        Employee empCheck = getEmployeeById(idEmp);
        if (empCheck.getRole().equals("admin")){
            Place place = getPlaceById(input.getIdPlace());
            if (place != null){
                if (input.getName() != null) place.setName(input.getName());
                if (input.getImage() != null )place.setImage(input.getImage());

                return placeRepository.save(place);
            }
        }

        return null;
    }

    public String deletePlace(String idEmp, String id){
        Employee empCheck = getEmployeeById(idEmp);
        if (empCheck.getRole().equals("admin")){
            Place placeCheck= getPlaceById(id);

            if (placeCheck != null){
                placeRepository.deleteById(id);
                return "Deleted";
            }
            return "Place not exist";
        }
        return null;
    }

    //Service
    public List<com.example.demo.model.Service> getAllService(){
        return serviceRepository.findAll();
    }

    public com.example.demo.model.Service getServiceById(String id){
        Optional<com.example.demo.model.Service> checkService= serviceRepository.findById(id);
        if (checkService.isEmpty()){
            return null;
        }
        return checkService.get();
    }

    public com.example.demo.model.Service createService( String idEmp,ServiceCreateInput input){
        Employee empCheck = getEmployeeById(idEmp);
        if (empCheck.getRole().equals("admin")){
            com.example.demo.model.Service checkService= getServiceById(input.getIdService());
            if (checkService != null){
                return null;
            }
            com.example.demo.model.Service service = new com.example.demo.model.Service();

            service.setIdService(input.getIdService());
            service.setName(input.getName());

            return serviceRepository.save(service);
        }
        return null;

    }

    public com.example.demo.model.Service updateService(String idEmp, ServiceCreateInput input){
        Employee empCheck = getEmployeeById(idEmp);
        if (empCheck.getRole().equals("admin")){
            com.example.demo.model.Service service = getServiceById(input.getIdService());

            if (service != null){
                if (input.getName() != null) service.setName(input.getName());

                return serviceRepository.save(service);
            }
        }
        return null;
    }

    public String deleteService(String idEmp,String id){
        Employee empCheck = getEmployeeById(idEmp);
        if (empCheck.getRole().equals("admin")){
            com.example.demo.model.Service service = getServiceById(id);

            if (service != null){
                serviceRepository.deleteById(id);
                return "Deleted";
            }
            return "Service not exist";
        }
        return null;

    }

    //Tour
    public List<Tour> getAllTour(){
        return tourRepository.findAll();
    }

    public List<TourShow> showAllTour( String key){
        List<TourShow> tourShows= new ArrayList<>();
        if (key != null){
            List<Tour> tours= tourRepository.searchTour(key);
            for(Tour t:tours) {
               TourShow tourShow= new TourShow();
               tourShow.setTour(t);
               tourShow.setImages(placeRepository.findById(placeTourRepository.getPlaceTourByIdTour(t.getIdTour()).get(0).getIdPlace()).get().getImage());
               tourShows.add(tourShow);
            }
            return tourShows;
        }
        List<Tour> tours= tourRepository.findAll();
        for(Tour t:tours) {
            TourShow tourShow= new TourShow();
            tourShow.setTour(t);
            tourShow.setImages(placeRepository.findById(placeTourRepository.getPlaceTourByIdTour(t.getIdTour()).get(0).getIdPlace()).get().getImage());
            tourShows.add(tourShow);
        }
        return tourShows;
    }

    public List<TourShow> filterTour( String key, Date start, Date end){
        List<TourShow> tourShows= new ArrayList<>();
            List<Tour> tours= tourRepository.filterTour(key, start, end);
            for(Tour t:tours) {
                TourShow tourShow= new TourShow();
                tourShow.setTour(t);
                tourShow.setImages(placeRepository.findById(placeTourRepository.getPlaceTourByIdTour(t.getIdTour()).get(0).getIdPlace()).get().getImage());
                tourShows.add(tourShow);
            }
            return tourShows;

    }

    public Tour getTourById(String id){
        Optional<Tour> tour= tourRepository.findById(id);
        if (tour.isEmpty()){
            return null;
        }
        return tour.get();
    }

    public List<Tour> getListTourByIdEmployee(String idEmployee){
        List<Tour> tourList = tourRepository.getTourByIdEmployee(idEmployee);
        if (tourList.size() == 0){
            return null;
        }
        return tourList;
    }

    public Tour createTour(String idEmp, Tour input){
        Employee empCheck = getEmployeeById(idEmp);
        if (empCheck.getRole().equals("admin")){
            Tour checkTour= getTourById(input.getIdTour());
            if (checkTour != null){
                return null;
            }
            Tour tour= new Tour();
            tour.setIdTour(input.getIdTour());
            tour.setTitle(input.getTitle());
            tour.setIdEmployee(input.getIdEmployee());
            tour.setDateStart(input.getDateStart());
            tour.setDateEnd(input.getDateEnd());
            tour.setPrice(input.getPrice());
            tour.setDescription(input.getDescription());
            tour.setType(input.getType());
            tourRepository.save(tour);
            return getTourById(tour.getIdTour());
        }
        return null;
    }

    public Tour updateTour(String idEmp, Tour input){
        Employee empCheck = getEmployeeById(idEmp);
        if (empCheck.getRole().equals("admin")){
            Tour tour= getTourById(input.getIdTour());

            if (tour != null){
                if (input.getTitle() != null) tour.setTitle(input.getTitle());
                if (input.getIdEmployee() != null) tour.setIdEmployee(input.getIdEmployee());
                if (input.getDateStart() != null) tour.setDateStart(input.getDateStart());
                if (input.getDateEnd() != null) tour.setDateEnd(input.getDateEnd());
                if (input.getPrice() != null) tour.setPrice(input.getPrice());
                if (input.getDescription() != null) tour.setDescription(input.getDescription());
                if (input.getType() != null) tour.setType(input.getType());

                return  tourRepository.save(tour);
            }
        }
        return null;


    }

    public Tour updateTourEmployee(String id, String idEmployee){
        Tour tour= getTourById(id);

        if (tour != null){
            Employee check = getEmployeeById(idEmployee);
            if (check != null){
                if (idEmployee != null) tour.setIdEmployee(idEmployee);
                return tourRepository.save(tour);
            }
        }
        return null;

    }

    public String deleteTour(String idEmp, String id){
        Employee empCheck = getEmployeeById(idEmp);
        if (empCheck.getRole().equals("admin")){
            Tour tour = getTourById(id);
            if (tour != null){
                tourRepository.deleteById(id);
                return "Deleted";
            }
            return "Tour not exist";
        }
        return null;
    }

    //Vehicle
    public List<Vehicle> getAllVehicle(){
        return vehicleRepository.findAll();
    }

    public Vehicle getVehicleById(String id){
        Optional<Vehicle> vehicle= vehicleRepository.findById(id);
        if (vehicle.isEmpty()){
            return null;
        }
        return vehicle.get();
    }

    public Vehicle createVehicle(String idEmp,VehicleCreateInput input){
        Employee empCheck = getEmployeeById(idEmp);
        if (empCheck.getRole().equals("admin")){
            Vehicle checkVehicle= getVehicleById(input.getIdVehicle());
            if (checkVehicle != null){
                return null;
            }
            Vehicle vehicle = new Vehicle();

            vehicle.setIdVehicle(input.getIdVehicle());
            vehicle.setName(input.getName());
            vehicle.setDriverName(input.getDriverName());
            vehicle.setType(input.getType());

            return  vehicleRepository.save(vehicle);
        }
        return null;

    }

    public Vehicle updateVehicle(String idEmp,Vehicle input){
        Employee empCheck = getEmployeeById(idEmp);
        if (empCheck.getRole().equals("admin")){
            Vehicle vehicle = getVehicleById(input.getIdVehicle());

            if (vehicle != null){
                if (input.getName() != null) vehicle.setName(input.getName());
                if (input.getDriverName() != null )vehicle.setDriverName(input.getDriverName());
                if (input.getType() != null) vehicle.setType(input.getType());

                return vehicleRepository.save(vehicle);
            }
        }
        return null;
    }

    public String deleteVehicle(String idEmp, String id){
        Employee empCheck = getEmployeeById(idEmp);
        if (empCheck.getRole().equals("admin")){
            Vehicle vehicleCheck= getVehicleById(id);

            if (vehicleCheck != null){
                vehicleRepository.deleteById(id);
                return "Deleted";
            }
            return "Vehicle not exist";
        }
        return null;

    }

    //VehicleTour
    public List<VehicleTour> getVehicleTourByIdTour(String idTour){
        return vehicleTourRepository.getVehicleTourByIdTour(idTour);
    }

    public List<Vehicle> getVehiclesByIdTour(String idTour){
        List<VehicleTour> vehicleTours= getVehicleTourByIdTour(idTour);
        List<Vehicle> vehicles= new ArrayList<>();
        for (VehicleTour v: vehicleTours){
            Vehicle vehicle= getVehicleById(v.getIdVehicle());
            vehicles.add(vehicle);
        }
        return vehicles;
    }

    public VehicleTour createVehicleTour(String idEmp, VehicleTour input){
        Employee empCheck = getEmployeeById(idEmp);
        if (empCheck.getRole().equals("admin")){
            VehicleTour vehicleTour= new VehicleTour();

            Tour checkTour= getTourById(input.getIdTour());
            Vehicle checkVehicle= getVehicleById(input.getIdVehicle());
            if (checkTour == null || checkVehicle == null){
                return null;
            }
            vehicleTour.setIdTour(input.getIdTour());
            vehicleTour.setIdVehicle(input.getIdVehicle());

            return vehicleTourRepository.save(vehicleTour);
        }
        return null;

    }

    public String deleteVehicleTour(String idEmp, VehicleTourKey id){
        Employee empCheck = getEmployeeById(idEmp);
        if (empCheck.getRole().equals("admin")){
            vehicleTourRepository.deleteById(id);
            return "Deleted";
        }
        return null;

    }

    public List<PlaceTour> getPlaceTourByIdTour(String idTour){
        return placeTourRepository.getPlaceTourByIdTour(idTour);
    }

    public List<Place> getPlacesByIdTour(String idTour){
        List<PlaceTour> placeTours= getPlaceTourByIdTour(idTour);
        List<Place> places= new ArrayList<>();
        for (PlaceTour p: placeTours){
            Place place= getPlaceById(p.getIdPlace());
            places.add(place);
        }
        return places;
    }

    public PlaceTour createPlaceTour(String idEmp,PlaceTour input){
        Employee empCheck = getEmployeeById(idEmp);
        if (empCheck.getRole().equals("admin")){
            PlaceTour placeTour= new PlaceTour();

            Tour checkTour= getTourById(input.getIdTour());
            Place checkPlace= getPlaceById(input.getIdPlace());
            if (checkTour == null || checkPlace == null){
                return null;
            }
            placeTour.setIdTour(input.getIdTour());
            placeTour.setIdPlace(input.getIdPlace());

            return placeTourRepository.save(placeTour);
        }
        return null;

    }

    public String deletePlaceTour(String idEmp, PlaceTourKey id){
        Employee empCheck = getEmployeeById(idEmp);
        if (empCheck.getRole().equals("admin")){
            placeTourRepository.deleteById(id);
            return "Deleted";
        }
        return null;

    }

    //ServiceTour
    public List<ServiceTour> getServiceTourByIdTour(String idTour){
        return serviceTourRepository.getServiceTourByIdTour(idTour);
    }

    public List<com.example.demo.model.Service> getServicesByIdTour(String idTour){
        List<ServiceTour> serviceTours= getServiceTourByIdTour(idTour);
        List<com.example.demo.model.Service> services= new ArrayList<>();
        for (ServiceTour s: serviceTours){
            com.example.demo.model.Service service= getServiceById(s.getIdService());
            services.add(service);
        }
        return services;
    }

    public ServiceTour createServiceTour(String idEmp, ServiceTour input){
        Employee empCheck = getEmployeeById(idEmp);
        if (empCheck.getRole().equals("admin")){
            ServiceTour serviceTour= new ServiceTour();
            Tour checkTour= getTourById(input.getIdTour());
            com.example.demo.model.Service checkService= getServiceById(input.getIdService());
            if (checkTour == null || checkService == null){
                return null;
            }
            serviceTour.setIdTour(input.getIdTour());
            serviceTour.setIdService(input.getIdService());

            return serviceTourRepository.save(serviceTour);
        }
        return null;

    }

    public String deleteServiceTour(String idEmp,ServiceTourkey id){
        Employee empCheck = getEmployeeById(idEmp);
        if (empCheck.getRole().equals("admin")){
            serviceTourRepository.deleteById(id);
            return "Deleted";
        }
        return null;

    }

    //Tour Detail
    public TourDetail getTourDetail(String idTour){
        TourDetail tourDetail = new TourDetail();

        tourDetail.setTour(getTourById(idTour));
        tourDetail.setPlaces(getPlacesByIdTour(idTour));
        tourDetail.setServices(getServicesByIdTour(idTour));
        tourDetail.setVehicles(getVehiclesByIdTour(idTour));
        tourDetail.setBookings(getBookingByIdTour(idTour));
        tourDetail.setAsks(getAskByIdTour(idTour));

        return tourDetail;
    }


}
