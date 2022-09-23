package com.example.demo.controller;

import com.example.demo.model.*;
import com.example.demo.model.composite.CustomerTourKey;
import com.example.demo.model.composite.PlaceTourKey;
import com.example.demo.model.composite.ServiceTourkey;
import com.example.demo.model.composite.VehicleTourKey;
import com.example.demo.model.input.*;
import com.example.demo.service.TravelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping(value = "/travel")
public class TravelController {

    @Autowired
    TravelService travelService;

    @Autowired
    FilesController filesController;
    //Ask
    @GetMapping("/ask/{idTour}")
    public List<Ask> getAskByIdTour(@PathVariable(name = "idTour") String idTour){
        return travelService.getAskByIdTour(idTour);
    }

    @PostMapping("/ask")
    public Ask createAsk(@RequestBody AskInput input){
        return travelService.createAsk(input);
    }

    @PutMapping("/ask/ask")
    public Ask updateAsk(@RequestBody AskInput input){
        return travelService.updateAsk(input);
    }

    @PutMapping("/ask/question")
    public Ask updateAnswer(@RequestHeader(name = "id", required = false)String idEmp,@RequestBody AnswerInput input){
        return travelService.updateAnswer(idEmp,input);
    }

    @DeleteMapping("/ask/{idTour}/{idCustomer}")
    public String deleteAsk(@RequestHeader(name = "id", required = false)String idEmp,@PathVariable(name = "idTour") String idTour, @PathVariable(name = "idCustomer") Integer idCustomer){
        return travelService.deleteAsk(idEmp,idTour, idCustomer);
    }

    //Booking
    @GetMapping("/booking/tour/{idTour}")
    public List<Booking> getBookingByIdTour(@PathVariable(name = "idTour") String idTour){
        return travelService.getBookingByIdTour(idTour);
    }

    @GetMapping("/booking/customer/{idCustomer}")
    public List<Booking> getBookingByIdCustomer(@PathVariable(name = "idCustomer") int idCustomer){
        return travelService.getBookingByIdCustomer(idCustomer);
    }

    @PostMapping("/booking")
    public Booking createBooking(@RequestBody BookingCreateInput input){
        return travelService.createBooking(input);
    }

    @PutMapping("/booking/judge")
    public Booking updateBookingJudge( @RequestBody JudgeInput input){
        return travelService.updateBookingJudge(input);
    }

    @DeleteMapping("/booking/{idCustomer}/{idTour}")
    public String deleteBooking(@RequestHeader(name = "id", required = false)String idEmp,@PathVariable(name = "idCustomer") int idCustomer, @PathVariable(name = "idTour") String idTour){
        CustomerTourKey id= new CustomerTourKey();
        id.setIdTour(idTour);
        id.setIdCustomer(idCustomer);
        return travelService.deleteBooking(idEmp,id);
    }

    //Customer
    @GetMapping("/customer")
    public List<Customer> getAllCustomer(){
        return travelService.getAllCustomer();
    }

    @GetMapping("/customer/tour/{idTour}")
    public List<Customer> getListCustomerByIdTour(@PathVariable(name = "idTour") String idTour){
        return travelService.getListCustomerByIdTour(idTour);
    }

    @GetMapping("/customer/{id}")
    public Customer getCustomerById(@PathVariable int id){
        return travelService.getCustomerById(id);
    }

    @PostMapping("/customer")
    public Customer createCustomer(@RequestBody CustomerInput input){
        return travelService.createCustomer(input);
    }

    @PutMapping("/customer/{id}")
    public Customer updateCustomer(@PathVariable int id,@RequestBody CustomerInput input){
        return travelService.updateCustomer(id, input);
    }

    @PutMapping("/customer/block/{idCustomer}")
    public Customer blockCustomer( @PathVariable(name = "idCustomer") int idCustomer){
        return travelService.blockCustomer(idCustomer);
    }

    @PutMapping("/customer/unblock/{idCustomer}")
    public Customer unblockCustomer(@PathVariable(name = "idCustomer") int idCustomer){
        return travelService.unblockCustomer(idCustomer);
    }

    @GetMapping("/customer/login/{phone}/{pass}")
    public Customer loginCustomer(@PathVariable(name = "phone") String phone, @PathVariable(name = "pass") String pass){
        return travelService.loginCustomer(phone, pass);
    }

    @DeleteMapping("/customer/{id}")
    public String deleteCustomer(@PathVariable int id){
        return travelService.deleteCustomer(id);
    }

    //Employee
    @GetMapping("/employee")
    public List<Employee> getAllEmployee(){
        return travelService.getAllEmployee();
    }

    @GetMapping("/employee/{id}")
    public Employee getEmployeeById(@PathVariable String id){
        return travelService.getEmployeeById(id);
    }

    @PostMapping("/employee")
    public Employee createEmployee(@RequestHeader(name = "id", required = false)String idEmp,@RequestBody EmployeeCreateInput input){
        return travelService.createEmployee(idEmp,input);
    }

    @PutMapping("/employee")
    public Employee updateEmployee(@RequestHeader(name = "id", required = false)String idEmp,@RequestBody EmployeeUpdateInput input){
        return travelService.updateEmployee( idEmp,input);
    }

    @GetMapping("/employee/login/{phone}/{pass}")
    public Employee loginEmployee(@PathVariable(name = "phone") String phone, @PathVariable(name = "pass") String pass){
        return travelService.loginEmployee(phone, pass);
    }

    @PutMapping("/emloyee/changePass")
    public Employee changeEmployeePassword(@RequestBody ChangePassInput input){
        return travelService.changeEmployeePassword(input);
    }

    @DeleteMapping("/employee/{id}")
    public String deleteEmployee(@RequestHeader(name = "id", required = false)String idEmp,@PathVariable String id){
        return travelService.deleteEmployee(idEmp,id);
    }

    //Place
    @GetMapping("/place")
    public List<Place> getAllPalce(){
        return travelService.getAllPlace();
    }

    @GetMapping("/place{id}")
    public Place getPlaceById(@PathVariable String id){
        return travelService.getPlaceById(id);
    }

    @PostMapping("/place")
    public Place createPlace(@RequestHeader(name = "id", required = false) String idEmp, @RequestBody PlaceCreateInput input){
        if (idEmp != null){
            return travelService.createPlace(idEmp,input);
        }
        return null;
    }

    @PutMapping("/place")
    public Place updatePlace(@RequestHeader(name = "id", required = false) String idEmp, @RequestBody Place input){
        return travelService.updatePlace( idEmp,input);
    }

    @DeleteMapping("/place/{id}")
    public String deletePlace(@RequestHeader(name = "id", required = false) String idEmp,@PathVariable String id){
        return travelService.deletePlace(idEmp,id);
    }

    //Service
    @GetMapping("/service")
    public List<Service> getAllService(){
        return travelService.getAllService();
    }

    @GetMapping("/service/{idService}")
    public Service getServiceById(@PathVariable(name = "idService") String idService){
        return travelService.getServiceById(idService);
    }

    @PostMapping("/service")
    public Service createService(@RequestHeader(name = "id", required = false)String idEmp,@RequestBody ServiceCreateInput input){
        return travelService.createService(idEmp,input);
    }

    @PutMapping("/service")
    public Service updateService(@RequestHeader(name = "id", required = false)String idEmp, @RequestBody ServiceCreateInput input){
        return travelService.updateService( idEmp,input);
    }

    @DeleteMapping("/service/{idService}")
    public String deleteService(@RequestHeader(name = "id", required = false)String idEmp, @PathVariable(name = "idService") String idService){
        return travelService.deleteService(idEmp,idService);
    }

    //Tour
    @GetMapping("/gettour")
    public List<Tour> getAllTour(){
        return travelService.getAllTour();
    }

    @GetMapping("/showtour")
    public List<TourShow> getAllTour(@RequestParam(name = "key" , required = false)  String key){
        return travelService.showAllTour(key);
    }

    @GetMapping("/filtertour")
    public List<TourShow> filterTour(@RequestParam(name = "key" , required = false)  String key,
                                     @RequestParam(name = "dateStart" , required = false) Date dateStart,
                                     @RequestParam(name = "dateEnd" , required = false)  Date dateEnd){
        return travelService.filterTour(key, dateStart, dateEnd);
    }

    @GetMapping("/tour/{id}")
    public Tour getTourById(@PathVariable String id){
        return travelService.getTourById(id);
    }

    @GetMapping("/tour/employee/{idEmployee}")
    public List<Tour> getListTourByIdEmployee(@PathVariable(name = "idEmployee") String idEmployee){
        return travelService.getListTourByIdEmployee(idEmployee);
    }

    @PostMapping("/tour")
    public Tour createTour(@RequestHeader(name = "id", required = false)String idEmp,@RequestBody Tour input){
        return travelService.createTour(idEmp,input);
    }

    @PutMapping("/tour")
    public Tour updateTour(@RequestHeader(name = "id", required = false)String idEmp,@RequestBody Tour input){
        return travelService.updateTour( idEmp,input);
    }

    @PutMapping("/tour/employee/{idTour}")
    public Tour updateTourEmployee(@PathVariable(name = "idTour") String idTour,@RequestBody String idEmployee){
        return travelService.updateTourEmployee(idTour,idEmployee );
    }

    @DeleteMapping("/tour/{id}")
    public String deleteTour(@RequestHeader(name = "id", required = false)String idEmp,@PathVariable String id){
        return travelService.deleteTour(idEmp,id);
    }

    //Vehicle
    @GetMapping("/vehicle")
    public List<Vehicle> getAllVehicle(){
        return travelService.getAllVehicle();
    }

    @GetMapping("/vehicle/{id}")
    public Vehicle getVehicleById(@PathVariable String id){
        return travelService.getVehicleById(id);
    }

    @PostMapping("/vehicle")
    public Vehicle createVehicle(@RequestHeader(name = "id", required = false)String idEmp,@RequestBody VehicleCreateInput input){
        return travelService.createVehicle(idEmp,input);
    }

    @PutMapping("/vehicle")
    public Vehicle updateVehicle(@RequestHeader(name = "id", required = false)String idEmp,@RequestBody Vehicle input){
        return travelService.updateVehicle( idEmp,input);
    }

    @DeleteMapping("/vehicle/{id}")
    public String deleteVehicle(@RequestHeader(name = "id", required = false)String idEmp,@PathVariable String id){
        return travelService.deleteVehicle(idEmp,id);
    }

    //VehicleTour
    @GetMapping("/vehicletour/{idTour}")
    public List<VehicleTour> getVehicleTourByIdTour(@PathVariable(name = "idTour") String idTour){
        return travelService.getVehicleTourByIdTour(idTour);
    }

    @GetMapping("/vehicletourshow/{idTour}")
    public List<Vehicle> getVehicleTourShowByIdTour(@PathVariable(name = "idTour") String idTour){
        return travelService.getVehiclesByIdTour(idTour);
    }

    @PostMapping("/vehicletour")
    public VehicleTour createVehicleTour(@RequestHeader(name = "id", required = false)String idEmp,@RequestBody VehicleTour input){
        return travelService.createVehicleTour(idEmp,input);
    }

    @DeleteMapping("/vehicletour/{idTour}/{idVehicle}")
    public String deleteVehicleTour(@RequestHeader(name = "id", required = false)String idEmp,@PathVariable(name = "idTour") String idTour, @PathVariable(name = "idVehicle") String idVehicle){
        VehicleTourKey key= new VehicleTourKey();
        key.setIdTour(idTour);
        key.setIdVehicle(idVehicle);
        return travelService.deleteVehicleTour(idEmp,key);
    }

    //PlaceTour
    @GetMapping("/placetour/{idTour}")
    public List<PlaceTour> getPlaceTourByIdTour(@PathVariable(name = "idTour") String idTour){
        return travelService.getPlaceTourByIdTour(idTour);
    }

    @GetMapping("/placetourshow/{idTour}")
    public List<Place> getPlaceTourShowByIdTour(@PathVariable(name = "idTour") String idTour){
        return travelService.getPlacesByIdTour(idTour);
    }

    @PostMapping("/placetour")
    public PlaceTour createPlaceTour(@RequestHeader(name = "id", required = false)String idEmp,@RequestBody PlaceTour input){
        return travelService.createPlaceTour(idEmp,input);
    }

    @DeleteMapping("/placetour/{idTour}/{idPlace}")
    public String deletePlaceTour(@RequestHeader(name = "id", required = false)String idEmp,@PathVariable(name = "idTour") String idTour, @PathVariable(name = "idPlace") String idPlace){
        PlaceTourKey key= new PlaceTourKey();
        key.setIdTour(idTour);
        key.setIdPlace(idPlace);
        return travelService.deletePlaceTour(idEmp,key);
    }

    //ServiceTour
    @GetMapping("/servicetour/{idTour}")
    public List<ServiceTour> getServiceTourByIdTour(@PathVariable(name = "idTour") String idTour){
        return travelService.getServiceTourByIdTour(idTour);
    }

    @GetMapping("/servicetourshow/{idTour}")
    public List<Service> getServiceTourShowByIdTour(@PathVariable(name = "idTour") String idTour){
        return travelService.getServicesByIdTour(idTour);
    }

    @PostMapping("/servicetour")
    public ServiceTour createServiceTour(@RequestHeader(name = "id", required = false)String idEmp,@RequestBody ServiceTour input) throws Exception {
//        ServiceTour check = travelService.createServiceTour(idEmp,input);
//        if (check == null){
//            throw  new Exception("lỗi");
//        }
        return travelService.createServiceTour(idEmp, input);
    }

    @DeleteMapping("/servicetour/{idTour}/{idService}")
    public String deleteServiceTour(@RequestHeader(name = "id", required = false)String idEmp,@PathVariable(name = "idTour") String idTour, @PathVariable(name = "idService") String idService){
        ServiceTourkey key= new ServiceTourkey();
        key.setIdTour(idTour);
        key.setIdService(idService);
        return travelService.deleteServiceTour(idEmp,key);
    }

    //Tour Detail
    @GetMapping("/tourdetail/{idTour}")
    public TourDetail getTourDetail(@PathVariable(name = "idTour") String idTour){
        return travelService.getTourDetail(idTour);
    }

    //Booking Detail
    @GetMapping("/bookingdetail/{idTour}/{idCustomer}")
    public BookingDetail getBookingDetail(@PathVariable(name = "idTour") String idTour, @PathVariable(name = "idCustomer") int idCustomer){
        return travelService.getBookingDetail(idTour, idCustomer);
    }

}
