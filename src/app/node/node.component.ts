import { Component, Input, OnInit } from "@angular/core";
import { TreeService } from "../services/tree.service";

@Component({
  selector: "app-node",
  templateUrl: "./node.component.html",
  styleUrls: ["./node.component.scss"],
})
export class NodeComponent implements OnInit {
  @Input() tree: { id: string | number; title: string; children: any[] }[];
  @Input() id;
  nodeToEdit: any = {};
  index: any;
  title: string;
  add: boolean = false;
  idNode: any;
  edit: boolean = false;
  addLeaf: boolean = false;
  constructor(private treeService: TreeService) {}

  ngOnInit(): void {}
/* delete function */
  delete(index) {
    this.tree.splice(index, 1);
    this.treeService.update_origin_tree(this.tree, this.id);
  }
  /* add node function */
  addNode(index?) {
    let id: number;
    id = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
    let node = { id: id.toString(), title: this.title, children: [] };
    if (this.addLeaf) {
      if (this.tree[index]["children"]) {
        this.tree[index]["children"].push(node);
      } else {
        this.tree[index]["children"] = [node];
      }
      this.addLeaf = false;
    } else {
      this.tree.push(node);
      this.add = false;
    }
    this.treeService.update_origin_tree(this.tree, this.id);
    this.title=""
  }
  /* Toggle edit input */
  openEditModal(node, index) {
    this.edit = true;
    this.idNode = node["id"];
    this.nodeToEdit = node;

    this.index = index;
  }
  /* submit edit */
  onKeyUp(event) {
    if (event.key == "Enter") {
      this.edit = false;
      this.treeService.update_origin_tree(this.tree, this.id);
      this.title=""
    }
  }
}
