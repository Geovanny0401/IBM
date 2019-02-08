package com.gmendozag.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.gmendozag.model.Asesor;

public interface IAsesorService extends ICRUD<Asesor> {

	Page<Asesor> listarPageable(Pageable pageable);
}
