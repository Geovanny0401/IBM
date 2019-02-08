package com.gmendozag.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gmendozag.model.Cliente;

public interface IClienteDAO extends JpaRepository<Cliente, Integer>{

}
