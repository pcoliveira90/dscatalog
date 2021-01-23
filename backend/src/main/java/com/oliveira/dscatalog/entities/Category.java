package com.oliveira.dscatalog.entities;

import java.io.Serializable;
import java.time.Instant;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;

import com.oliveira.dscatalog.dto.CategoryDTO;

@Entity
@Table(name="tb_category")
public class Category  implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String name;
	
	@Column(columnDefinition =  "TIMESTAMP WITHOUT TIME ZONE")
	private Instant createAt;
	
	@Column(columnDefinition =  "TIMESTAMP WITHOUT TIME ZONE")
	private Instant updateAt;
	
	
	
	public Category() {}

	public Category(long id, String name) {
		super();
		setId(id);
		setName(name);
	}
	
	public Category(CategoryDTO dto) {
		setName(dto.getName());
	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	public Instant getCreateAt() {
		return createAt;
	}
	
	@PrePersist
	private void prePersist() {
		this.createAt = Instant.now();
	}

	public Instant getUpdateAt() {
		return updateAt;
	}

	@PreUpdate
	private void preUpdate() {
		this.updateAt = Instant.now();
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (int) (id ^ (id >>> 32));
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Category other = (Category) obj;
		if (id != other.id)
			return false;
		return true;
	}
	
	
	
	
}
