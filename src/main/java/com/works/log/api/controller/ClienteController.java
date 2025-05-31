package com.works.log.api.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.works.log.domain.model.Cliente;
import com.works.log.domain.repository.ClienteRepository;
import com.works.log.domain.service.CatalogoClienteService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/clientes")
@Tag(name = "Clientes", description = "Operações relacionadas ao gerenciamento de clientes")
public class ClienteController {

	private ClienteRepository clienteRepository;
	private CatalogoClienteService catalogoClienteService;

	@GetMapping
	@Operation(summary = "Listar todos os clientes", description = "Retorna uma lista com todos os clientes cadastrados")
	@ApiResponse(responseCode = "200", description = "Lista de clientes retornada com sucesso")
	public List<Cliente> listar() {
		return clienteRepository.findAll();
	}

	@GetMapping("/{clienteId}")
	@Operation(summary = "Buscar cliente por ID", description = "Retorna um cliente específico pelo seu ID")
	@ApiResponses({
			@ApiResponse(responseCode = "200", description = "Cliente encontrado"),
			@ApiResponse(responseCode = "404", description = "Cliente não encontrado")
	})
	public ResponseEntity<Cliente> buscar(
			@Parameter(description = "ID do cliente", required = true)
			@PathVariable Long clienteId) {
		return clienteRepository.findById(clienteId)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	@Operation(summary = "Criar novo cliente", description = "Cadastra um novo cliente no sistema")
	@ApiResponses({
			@ApiResponse(responseCode = "201", description = "Cliente criado com sucesso"),
			@ApiResponse(responseCode = "400", description = "Dados inválidos fornecidos")
	})
	public Cliente adicionar(@Valid @RequestBody Cliente cliente) {
		return catalogoClienteService.salvar(cliente);
	}

	@PutMapping("/{clienteId}")
	@Operation(summary = "Atualizar cliente", description = "Atualiza os dados de um cliente existente")
	@ApiResponses({
			@ApiResponse(responseCode = "200", description = "Cliente atualizado com sucesso"),
			@ApiResponse(responseCode = "404", description = "Cliente não encontrado"),
			@ApiResponse(responseCode = "400", description = "Dados inválidos fornecidos")
	})
	public ResponseEntity<Cliente> atualizar(
			@Parameter(description = "ID do cliente", required = true)
			@PathVariable Long clienteId,
			@Valid @RequestBody Cliente cliente) {
		if (!clienteRepository.existsById(clienteId)) {
			return ResponseEntity.notFound().build();
		}

		cliente.setId(clienteId);
		cliente = catalogoClienteService.salvar(cliente);

		return ResponseEntity.ok(cliente);
	}

	@DeleteMapping("/{clienteId}")
	@Operation(summary = "Remover cliente", description = "Remove um cliente do sistema")
	@ApiResponses({
			@ApiResponse(responseCode = "204", description = "Cliente removido com sucesso"),
			@ApiResponse(responseCode = "404", description = "Cliente não encontrado")
	})
	public ResponseEntity<Void> remover(
			@Parameter(description = "ID do cliente", required = true)
			@PathVariable Long clienteId) {
		if (!clienteRepository.existsById(clienteId)) {
			return ResponseEntity.notFound().build();
		}

		catalogoClienteService.excluir(clienteId);

		return ResponseEntity.noContent().build();
	}
}