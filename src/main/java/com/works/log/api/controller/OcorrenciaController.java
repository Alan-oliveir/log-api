package com.works.log.api.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.works.log.api.assembler.OcorrenciaAssembler;
import com.works.log.api.model.OcorrenciaModel;
import com.works.log.api.model.input.OcorrenciaInput;
import com.works.log.domain.model.Entrega;
import com.works.log.domain.model.Ocorrencia;
import com.works.log.domain.service.BuscaEntregaService;
import com.works.log.domain.service.RegistroOcorrenciaService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/entregas/{entregaId}/ocorrencias")
@Tag(name = "Ocorrências", description = "Operações relacionadas ao registro e consulta de ocorrências em entregas")
public class OcorrenciaController {

	private BuscaEntregaService buscaEntregaService;
	private RegistroOcorrenciaService registroOcorrenciaService;
	private OcorrenciaAssembler ocorrenciaAssembler;

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	@Operation(summary = "Registrar nova ocorrência",
			description = "Registra uma nova ocorrência para uma entrega específica")
	@ApiResponses({
			@ApiResponse(responseCode = "201", description = "Ocorrência registrada com sucesso"),
			@ApiResponse(responseCode = "400", description = "Dados inválidos fornecidos"),
			@ApiResponse(responseCode = "404", description = "Entrega não encontrada")
	})
	public OcorrenciaModel registrar(
			@Parameter(description = "ID da entrega para registrar a ocorrência", required = true)
			@PathVariable Long entregaId,
			@Valid @RequestBody OcorrenciaInput ocorrenciaInput) {

		Ocorrencia ocorrenciaRegistrada = registroOcorrenciaService
				.registrar(entregaId, ocorrenciaInput.getDescricao());

		return ocorrenciaAssembler.toModel(ocorrenciaRegistrada);
	}

	@GetMapping
	@Operation(summary = "Listar ocorrências da entrega",
			description = "Retorna todas as ocorrências registradas para uma entrega específica")
	@ApiResponses({
			@ApiResponse(responseCode = "200", description = "Lista de ocorrências retornada com sucesso"),
			@ApiResponse(responseCode = "404", description = "Entrega não encontrada")
	})
	public List<OcorrenciaModel> listar(
			@Parameter(description = "ID da entrega para listar as ocorrências", required = true)
			@PathVariable Long entregaId) {
		Entrega entrega = buscaEntregaService.buscar(entregaId);

		return ocorrenciaAssembler.toCollectionModel(entrega.getOcorrencias());
	}
}
