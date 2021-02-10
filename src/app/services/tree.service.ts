import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TreeService {
  tree: any;
  constructor() {
    /* initialize tree */
    this.tree = this.getFromLocalStorage();
    if (!this.tree) {
      this.tree = [
        {
          id: "1",
          title: "node1",
          children: [
            {
              id: "1.1",
              title: "node1.1",
              children: [
                {
                  id: "1.1.1",
                  title: "node1.1.1 ",
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: "2",
          title: "node2",
          children: [],
        },
        {
          id: "3",
          title: "node3",
          children: [
            {
              id: "3.1",
              title: "node3.1",
              children: [],
            },
            {
              id: "3.2",
              title: "node3.2",
              children: [
                {
                  id: "3.2.1",
                  title: "node3.2.1",
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: "4",
          title: "node4",
          children: [],
        },
      ];
      this.setToLocalStorage({});
    }
  }
  /* Get from locale storage */
  getFromLocalStorage() {
    let tree = JSON.parse(localStorage.getItem("tree"));
    return tree;
  }
  /* Set to locale storage */
  setToLocalStorage(tree) {
    localStorage.setItem("tree", JSON.stringify(this.tree));
  }
  /* Update locale storage */
  update_origin_tree(subtree, id) {
    if (id == "-1") {
      this.tree = subtree;
    } else {
      this.find_index(this.tree, subtree, id);
    }
    this.setToLocalStorage(this.tree);
  }

  find_index(tree, subtree, id) {
    for (let index = 0; index < tree.length; index++) {
      const element = tree[index];

      if (element.id == id) {
        tree[index]["children"] = subtree;
        return tree;
      }
      if (tree[index]["children"]) {
        this.find_index(tree[index]["children"], subtree, id);
      }
    }
  }
  getByTitle(tree, title) {
    let result = null;
    if (title === tree.title) {
      return tree;
    } else {
      if (tree.children && tree.children.length) {
        tree.children.some((node) => (result = this.getByTitle(node, title)));
      }
      return result;
    }
  }
}
