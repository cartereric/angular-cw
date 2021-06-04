import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from "../../Services/modal.service";
import { ChessStarterService } from "../../Services/chess-starter.service";

@Component({
  selector: 'app-advanced-config-modal',
  templateUrl: './advanced-config-modal.component.html',
  styleUrls: ['./advanced-config-modal.component.css']
})
export class AdvancedConfigModalComponent implements OnInit {
  fen = "";
  color = "White";
  selfPlay = false;

  constructor( private modalService: NgbModal, private modalCommunicator: ModalService, private chessStarterService: ChessStarterService) { }

  @ViewChild('content') content: ElementRef;

  private open(content) {
    this.modalService.open( content, {centered: true} );
  }

  advancedConfigStartGame() {
    const data = {};
    data["fen"] = this.fen;
    data["color"] = this.color;
    data["selfPlay"] = this.selfPlay;
    this.chessStarterService.advanceConfigStartGame.emit(data);
    this.modalService.dismissAll();
  }

  closeAdvancedConfigModal() {
    this.modalService.dismissAll();
  }

  ngOnInit() {
    this.modalCommunicator.openAdvancedConfigModal.subscribe(() => {
      this.open(this.content);
    })
  }
}
