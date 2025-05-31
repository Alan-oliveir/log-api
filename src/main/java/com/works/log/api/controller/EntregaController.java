package com.works.log.api.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.works.log.api.assembler.EntregaAssembler;
import com.works.log.api.model.EntregaModel;
import com.works.log.api.model.input.EntregaInput;
import com.works.log.domain.model.Entrega;
import com.works.log.domain.repository.EntregaRepository;
import com.works.log.domain.service.FinalizacaoEntregaService;
import com.works.log.domain.service.SolicitacaoEntregaService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/entregas")
@Tag(name = "Entregas", description = "Operações relacionadas ao gerenciamento de entregas")
public class EntregaController {

	private EntregaRepository entregaRepository;
	private SolicitacaoEntregaService solicitacaoEntregaService;
	private FinalizacaoEntregaService finalizacaoEntregaService;
	private EntregaAssembler entregaAssembler;

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	@Operation(summary = "Solicitar nova entrega",
			description = "Cria uma nova solicitação de entrega no sistema")
	@ApiResponses({
			@ApiResponse(responseCode = "201", description = "Entrega solicitada com sucesso"),
			@ApiResponse(responseCode = "400", description = "Dados inválidos fornecidos"),
			@ApiResponse(responseCode = "404", description = "Cliente não encontrado")
	})
	public EntregaModel solicitar(@Valid @RequestBody EntregaInput entregaInput) {
		Entrega novaEntrega = entregaAssembler.toEntity(entregaInput);
		Entrega entregaSolicitada = solicitacaoEntregaService.solicitar(novaEntrega);

		return entregaAssembler.toModel(entregaSolicitada);
	}

	@PutMapping("/{entregaId}/finalizacao")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@Operation(summary = "Finalizar entrega",
			description = "Marca uma entrega como finalizada, alterando seu status")
	@ApiResponses({
			@ApiResponse(responseCode = "204", description = "Entrega finalizada com sucesso"),
			@ApiResponse(responseCode = "404", description = "Entrega não encontrada"),
			@ApiResponse(responseCode = "400", description = "Entrega não pode ser finalizada (status inválido)")
	})
	public void finalizar(
			@Parameter(description = "ID da entrega a ser finalizada", required = true)
			@PathVariable Long entregaId) {
		finalizacaoEntregaService.finalizar(entregaId);
	}

	@GetMapping
	@Operation(summary = "Listar todas as entregas",
			description = "Retorna uma lista com todas as entregas cadastradas no sistema")
	@ApiResponse(responseCode = "200", description = "Lista de entregas retornada com sucesso")
	public List<EntregaModel> listar() {
		return entregaAssembler.toCollectionModel(entregaRepository.findAll());
	}

	@GetMapping("/{entregaId}")
	@Operation(summary = "Buscar entrega por ID",
			description = "Retorna os detalhes de uma entrega específica pelo seu ID")
	@ApiResponses({
			@ApiResponse(responseCode = "200", description = "Entrega encontrada"),
			@ApiResponse(responseCode = "404", description = "Entrega não encontrada")
	})
	public ResponseEntity<EntregaModel> buscar(
			@Parameter(description = "ID da entrega", required = true)
			@PathVariable Long entregaId) {
		return entregaRepository.findById(entregaId)
				.map(entrega -> ResponseEntity.ok(entregaAssembler.toModel(entrega)))
				.orElse(ResponseEntity.notFound().build());
	}
}
