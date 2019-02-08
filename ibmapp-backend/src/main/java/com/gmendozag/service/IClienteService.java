package com.gmendozag.service;

import com.gmendozag.model.Cliente;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IClienteService extends ICRUD<Cliente> {
	
	Page<Cliente> listarPageable(Pageable pageable); 

}
