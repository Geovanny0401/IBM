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
import com.gmendozag.model.Asesor;
import com.gmendozag.model.Cliente;
import com.gmendozag.service.IAsesorService;
import com.gmendozag.service.IClienteService;

@RestController
@RequestMapping("/asesores")
public class AsesorController {

	@Autowired
	private IAsesorService service;
	
	
	@GetMapping(produces = "application/json")
	public ResponseEntity<List<Asesor>> listar() {
		List<Asesor> asesores = new ArrayList<>();
		asesores = service.listar();
		return new ResponseEntity<List<Asesor>>(asesores, HttpStatus.OK);

	}
	
	//NUEVO
	@GetMapping(value="/pageable", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Page<Asesor>> listarPageable(Pageable pageable){
		Page<Asesor> asesores;
		
		asesores = service.listarPageable(pageable);
		return new ResponseEntity<Page<Asesor>>(asesores, HttpStatus.OK);
	}

	@GetMapping(value = "/{id}", produces = "application/json")
	public Resource<Asesor> listarPorId(@PathVariable("id") Integer id) {
		Asesor ase = service.listarId(id);
		if (ase == null) {
			throw new ModeloNotFoundException("Id no encontrado " + id);
		}
		// localhost:8080/pacientes/1
		Resource<Asesor> resource = new Resource<Asesor>(ase);
		ControllerLinkBuilder linkTo = linkTo(methodOn(this.getClass()).listarPorId(id));
		resource.add(linkTo.withRel("asesor-resource"));

		return resource;
	}

	@PostMapping(produces = "application/json", consumes = "application/json")
	public ResponseEntity<Object> registrar(@RequestBody Asesor asesor) {
		Asesor ase = new Asesor();
		ase = service.registrar(asesor);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(ase.getIdAsesor()).toUri();
		return ResponseEntity.created(location).build();
	}

	@PutMapping(produces = "application/json", consumes = "application/json")
	public ResponseEntity<Object> modificar(@RequestBody Asesor asesor) {
		service.modificar(asesor);
		return new ResponseEntity<Object>(HttpStatus.OK);

	}

	@DeleteMapping(value = "/{id}")
	public void eliminar(@PathVariable("id") Integer id) {
		Asesor ase = service.listarId(id);
		if (ase == null) {
			throw new ModeloNotFoundException("ID NO ENCONTRADO: " + id);
		} else {
			service.eliminar(id);
		}
	}
}
