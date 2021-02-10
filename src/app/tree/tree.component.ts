import { Component, OnInit } from "@angular/core";
import { TreeService } from "../services/tree.service";

@Component({
  selector: "app-tree",
  templateUrl: "./tree.component.html",
  styleUrls: ["./tree.component.scss"],
})
export class TreeComponent implements OnInit {
  tree: any;
  id: any;
  searchInput: string;
  searchResult: any = [];
  searchTree: any;
  constructor(private treeService: TreeService) {}

  ngOnInit(): void {
    this.tree = this.treeService.getFromLocalStorage();
    this.searchTree = this.tree;
    this.id = -1;
  }
  /* search function*/
  search(event) {
    if (event.key == "Enter") {
      this.searchResult = [];
      this.tree.forEach((element, index) => {
        let result = this.treeService.getByTitle(
          this.tree[index],
          this.searchInput
        );
        if (result !== null) this.searchResult.push(result);
      });
    }
  }
}
