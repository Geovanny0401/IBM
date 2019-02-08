package com.gmendozag.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.gmendozag.dao.IAsesorDAO;
import com.gmendozag.model.Asesor;
import com.gmendozag.model.Cliente;
import com.gmendozag.service.IAsesorService;

@Service
public class AsesorServiceImpl implements IAsesorService {


	@Autowired
	private IAsesorDAO dao;

	@Override
	public Asesor registrar(Asesor t) {
		return dao.save(t);
	}

	@Override
	public Asesor modificar(Asesor t) {
		return dao.save(t);
	}

	@Override
	public void eliminar(int id) {
		dao.delete(id);
	}

	@Override
	public List<Asesor> listar() {
		return dao.findAll();
	}

	@Override
	public Asesor listarId(int id) {
		return dao.findOne(id);
	}
	
	@Override
	public Page<Asesor> listarPageable(Pageable pageable) {
		
		return dao.findAll(pageable);
	}

}
