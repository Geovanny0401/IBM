package com.gmendozag.controller;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.gmendozag.exception.ModeloNotFoundException;
import com.gmendozag.model.Cliente;
import com.gmendozag.model.Tarjeta;
import com.gmendozag.service.ITarjetaService;

@RestController
@RequestMapping("/tarjetas")
public class TarjetaController {
	
	@Autowired
	private ITarjetaService service;
	
	
	@GetMapping(produces = "application/json")
	public ResponseEntity<List<Tarjeta>> listar() {
		List<Tarjeta> tarjetas = new ArrayList<>();
		tarjetas = service.listar();
		return new ResponseEntity<List<Tarjeta>>(tarjetas, HttpStatus.OK);

	}
	
	//NUEVO
	@GetMapping(value="/pageable", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Page<Tarjeta>> listarPageable(Pageable pageable){
		Page<Tarjeta> tarjetas;
		
		tarjetas = service.listarPageable(pageable);
		return new ResponseEntity<Page<Tarjeta>>(tarjetas, HttpStatus.OK);
	}

	@GetMapping(value = "/{id}", produces = "application/json")
	public Resource<Tarjeta> listarPorId(@PathVariable("id") Integer id) {
		Tarjeta taj = service.listarId(id);
		if (taj == null) {
			throw new ModeloNotFoundException("Id no encontrado " + id);
		}
		// localhost:8080/pacientes/1
		Resource<Tarjeta> resource = new Resource<Tarjeta>(taj);
		ControllerLinkBuilder linkTo = linkTo(methodOn(this.getClass()).listarPorId(id));
		resource.add(linkTo.withRel("tarjeta-resource"));

		return resource;
	}

	@PostMapping(produces = "application/json", consumes = "application/json")
	public ResponseEntity<Object> registrar(@RequestBody Tarjeta tarjeta) {
		Tarjeta taj = new Tarjeta();
		taj = service.registrar(tarjeta);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(taj.getIdTarjeta()).toUri();
		return ResponseEntity.created(location).build();
	}

	@PutMapping(produces = "application/json", consumes = "application/json")
	public ResponseEntity<Object> modificar(@RequestBody Tarjeta tarjeta) {
		service.modificar(tarjeta);
		return new ResponseEntity<Object>(HttpStatus.OK);

	}

	@DeleteMapping(value = "/{id}")
	public void eliminar(@PathVariable("id") Integer id) {
		Tarjeta taj = service.listarId(id);
		if (taj == null) {
			throw new ModeloNotFoundException("ID NO ENCONTRADO: " + id);
		} else {
			service.eliminar(id);
		}
	}
}
