package com.gmendozag.service;

import java.util.List;

public interface ICRUD<T> {

	T registrar(T t);
	T modificar(T t);
	void eliminar(int id);
	List<T> listar();
	T listarId(int id);
}
