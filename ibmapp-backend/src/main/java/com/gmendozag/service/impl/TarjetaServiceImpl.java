package com.gmendozag.service.impl;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.gmendozag.dao.ITarjetaDAO;
import com.gmendozag.model.Cliente;
import com.gmendozag.model.DetalleConsumo;
import com.gmendozag.model.Tarjeta;
import com.gmendozag.service.ITarjetaService;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TarjetaServiceImpl implements ITarjetaService {

	@Autowired
	private ITarjetaDAO dao;
	
	
    @Transactional
	@Override
	public Tarjeta registrar(Tarjeta tarjeta) {
		tarjeta.getDetalleConsumo().forEach(d->{
			d.setTarjeta(tarjeta);
		});
		return dao.save(tarjeta);
	}
	


	@Override
	public Tarjeta modificar(Tarjeta t) {
		return dao.save(t);
	}

	@Override
	public void eliminar(int id) {
		dao.delete(id);

	}

	@Override
	public List<Tarjeta> listar() {
		return dao.findAll();
	}

	@Override
	public Tarjeta listarId(int id) {
		return dao.findOne(id);
	}
	
	@Override
	public Page<Tarjeta> listarPageable(Pageable pageable) {
		
		return dao.findAll(pageable);
	}

}
