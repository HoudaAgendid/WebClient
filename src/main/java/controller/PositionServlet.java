package controller;

import java.io.IOException;
import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.ejb.EJB;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import dao.PositionLocal;
import dao.SmartphoneLocal;
import entities.Position;
import entities.Smartphone;

/**
 * Servlet implementation class PositionServlet
 */
@WebServlet("/PositionServlet")
public class PositionServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	@EJB
    private PositionLocal metier;
	@EJB
	private SmartphoneLocal smartphone;
    
	
	 protected void processRequest(HttpServletRequest request, HttpServletResponse response)
	            throws ServletException, IOException {
	    	
		 if("add".equals(request.getParameter("action"))) {
			 Date date=(request.getParameter("date")!="")? new Date(request.getParameter("date").replace("-", "/")):new Date();
			 metier.create(new Position(Double.parseDouble(request.getParameter("lat")),Double.parseDouble( request.getParameter("lng")), date, smartphone.findById(Integer.parseInt(request.getParameter("id")))));
			 response.setContentType("application/json");
	            List<Position> postions = new ArrayList<>();
	            for (Position p : metier.findAll()) {
	                postions.add(new Position(p.getId(),p.getLatitude(),p.getLongitude(),p.getDate()));
	                
	               // System.out.println(postions);
	            Gson json = new Gson();
	            response.getWriter().write(json.toJson(postions));
	          }
		 }else {
	        	response.setContentType("application/json");
	            List<Position> postions = new ArrayList<>();
	           // System.out.println("test "+metier.findAll());
	            for (Position p : metier.findAll()) {
	            	System.out.println(p.getId()+" vas y");
	            	
	                postions.add(new Position(p.getId(),p.getLatitude(),p.getLongitude(),p.getDate()));
	            }
//	            Map<Smartphone, Long> counting = postions.stream().collect(
//	                    Collectors.groupingBy(Position::getSmartPhone, Collectors.counting()));

	            //System.out.println(counting);
	            //List<ChartDto> dataTheChart = new ArrayList<ChartDto>();
//	            for (Map.Entry<Smartphone, Long> entry: counting.entrySet()) {
//	                System.out.println(entry.getKey().getImei() +" - "+ entry.getValue());
//	                //dataTheChart.add(new ChartDto(entry.getKey().getImei(), entry.getValue()));
//	            }
	            
	                //System.out.println("after loops "+postions);
	            Gson json = new Gson();
	            //response.getWriter().write(json.toJson(dataTheChart));
	          
	            
	        }
	    }
	
	

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		processRequest(request, response);
	}

}
