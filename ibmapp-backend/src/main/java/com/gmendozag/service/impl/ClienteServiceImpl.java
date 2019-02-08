package com.gmendozag.service.impl;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gmendozag.dao.IClienteDAO;
import com.gmendozag.model.Cliente;
import com.gmendozag.service.IClienteService;

@Service
public class ClienteServiceImpl implements IClienteService {

	@Autowired
	private IClienteDAO dao;
	
	@Override
	public Cliente registrar(Cliente t) {
		return dao.save(t);
	}

	@Override
	public Cliente modificar(Cliente t) {
		return dao.save(t);
	}

	@Override
	public void eliminar(int id) {
		dao.delete(id);

	}

	@Override
	public List<Cliente> listar() {
		
		return dao.findAll();
	}

	@Override
	public Cliente listarId(int id) {
		return dao.findOne(id);
	}
	
	@Override
	public Page<Cliente> listarPageable(Pageable pageable) {
		
		return dao.findAll(pageable);
	}

}
