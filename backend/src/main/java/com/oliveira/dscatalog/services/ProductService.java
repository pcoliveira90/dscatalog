package com.oliveira.dscatalog.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.oliveira.dscatalog.dto.CategoryDTO;
import com.oliveira.dscatalog.dto.ProductDTO;
import com.oliveira.dscatalog.entities.Category;
import com.oliveira.dscatalog.entities.Product;
import com.oliveira.dscatalog.repositories.CategoryRepository;
import com.oliveira.dscatalog.repositories.ProductRepository;
import com.oliveira.dscatalog.services.exceptions.DataBaseException;
import com.oliveira.dscatalog.services.exceptions.ResourceNotFoundException;


@Service
public class ProductService {
	
	@Autowired
	private ProductRepository repository;
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Transactional(readOnly = true)
	public Page<ProductDTO> findAll(PageRequest page){
		return repository.findAll(page).map(x -> new ProductDTO(x));
	}
	
	
	@Transactional(readOnly = true)
	public List<ProductDTO> findAll(){
		return repository.findAll().stream().map(x -> new ProductDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public ProductDTO findById(Long id){
		Optional<Product> obj =repository.findById(id);
		Product entity = obj.orElseThrow(() -> new ResourceNotFoundException("Product não localizado!"));
		return new ProductDTO(entity, entity.getCategories());
	}
	
	@Transactional
	public ProductDTO insert(ProductDTO dto) {
		Product entity = new Product(dto);
		entity = repository.save(entity);
		return  new ProductDTO(entity);
	}
	
	@Transactional
	public ProductDTO update(Long id,ProductDTO dto) {
		try{
			Product entity = repository.getOne(id);
			copyDtoToEntity(dto, entity);
			entity = repository.save(entity);
			return  new ProductDTO(entity);
	
		}catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found "+id);
		}
		
	}
	
	public void delete(Long id) {
		try {
			repository.deleteById(id);
		}catch( EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not found "+id);
		}catch( DataIntegrityViolationException e) {
			throw new DataBaseException("Integrity violation");
		}
	}
	
	private void copyDtoToEntity(ProductDTO dto, Product entity) {
		
		entity.setName(dto.getName());
		entity.setDescription(dto.getDescription());
		entity.setPrice(dto.getPrice());
		entity.setImgUrl(dto.getImgUrl());
		
		entity.getCategories().clear();
		for(CategoryDTO catDTO : dto.getCategories()) {
			Category cat = categoryRepository.getOne(catDTO.getId());
			entity.getCategories().add(cat);
		}
	}
}
