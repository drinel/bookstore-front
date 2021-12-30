import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {

  id_cat: String =''

  livro: Livro = {
    id: '',
    titulo: '',
    nome_autor: '',
    texto: ''
  }

titulo = new FormControl('',[Validators.minLength(2)])
nome_autor = new FormControl('',[Validators.minLength(2)])
texto = new FormControl('',[Validators.minLength(10)])

  constructor(private service: LivroService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!
  }

   create():void {
      this.service.create(this.livro, this.id_cat).subscribe((resposta) =>{
      this.router.navigate([`categorias/${this.id_cat}/livros`])
      this.service.message('Livro criado com sucesso!')
      }, err =>{
        this.router.navigate([`categorias/${this.id_cat}/livros`])
        this.service.message('Erro na criação do livro')
      })
   }

   cancel(): void{
    this.router.navigate([`categorias/${this.id_cat}/livros`])
   }


  getMessage(campo: String){
    let invalidos = this.titulo.invalid||this.nome_autor.invalid||this.texto.invalid

    if(this.titulo.invalid && campo == "titulo"){
      return 'O campo TÌTULO deve conter entre 2 a 100 caracteres'
    }
     if (this.nome_autor.invalid && campo == "nome_autor"){
      return 'O campo NOME DO AUTOR deve conter entre 2 a 100 caracteres'
    }
    if(this.texto.invalid && campo == "texto"){
      return 'O campo TEXTO deve conter entre 10 a 9999999 caracteres'
    }
     if(invalidos&&campo == "button"){
       return true
     }
      return false

  }




}
