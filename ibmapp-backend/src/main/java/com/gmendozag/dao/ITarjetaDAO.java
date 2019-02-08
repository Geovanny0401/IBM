package com.gmendozag.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gmendozag.model.Tarjeta;

public interface ITarjetaDAO extends JpaRepository<Tarjeta, Integer> {

}
