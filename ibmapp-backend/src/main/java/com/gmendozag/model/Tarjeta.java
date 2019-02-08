package com.gmendozag.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.NumberFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
@Table(name = "tarjeta")
public class Tarjeta {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idTarjeta;

	@Column(name = "numtarjeta", nullable = false, length = 8)
	private Long numtarjeta;

	@Size(min = 3, max = 4)
	// @Column(name = "ccv", nullable = false)
	private String ccv;

	@Column(name = "tiptarjeta", nullable = false, length = 50)
	private String tiptarjeta;

	@ManyToOne
	@JoinColumn(name = "id_cliente", nullable = false)
	private Cliente cliente;
	
	@OneToMany(mappedBy="tarjeta",cascade= {CascadeType.PERSIST, CascadeType.MERGE,
			CascadeType.REMOVE}, fetch = FetchType.LAZY, orphanRemoval=true )
	private List<DetalleConsumo> detalleConsumo;

	public int getIdTarjeta() {
		return idTarjeta;
	}

	public void setIdTarjeta(int idTarjeta) {
		this.idTarjeta = idTarjeta;
	}

	public Long getNumtarjeta() {
		return numtarjeta;
	}

	public void setNumtarjeta(Long numtarjeta) {
		this.numtarjeta = numtarjeta;
	}

	public String getCcv() {
		return ccv;
	}

	public void setCcv(String ccv) {
		this.ccv = ccv;
	}

	public String getTiptarjeta() {
		return tiptarjeta;
	}

	public void setTiptarjeta(String tiptarjeta) {
		this.tiptarjeta = tiptarjeta;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	public List<DetalleConsumo> getDetalleConsumo() {
		return detalleConsumo;
	}

	public void setDetalleConsumo(List<DetalleConsumo> detalleConsumo) {
		this.detalleConsumo = detalleConsumo;
	}

	
	
	
}
