package com.gmendozag.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.gmendozag.model.Tarjeta;

public interface ITarjetaService extends ICRUD<Tarjeta> {

	Page<Tarjeta> listarPageable(Pageable pageable); 
}
