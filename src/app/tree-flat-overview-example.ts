import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface TemplateNode {
  name: string;
  children?: TemplateNode[];
}

const TREE_DATA: TemplateNode[] = [
  {
    name: 'Well Template',
    children: [
      {
        id: 'c44a7942-6956-4c5c-bf5a-516ec180251b',
        name: 'ASLT_DCBL_VDL-yanhua-test',
        createdBy: {
          userId: 'rchauhan10@slb.com',
        },
        creationTime: '2022-07-26T08:51:30.4900504+00:00',
        visibleScope: {
          wellIds: ['7c0eb4ab-b1d4-43de-861a-118649e766a0'],
        },
      },
      {
        id: '89ff7ebc-ecc7-4418-a9c7-b7b3eb3f1f76',
        name: 'ASLT_DCBL_VDL-yanhua-test',
        createdBy: {
          userId: 'rchauhan10@slb.com',
        },
        creationTime: '2022-07-26T08:48:53.3325537+00:00',
        visibleScope: {
          wellIds: ['7c0eb4ab-b1d4-43de-861a-118649e766a0'],
        },
      },
      {
        id: 'a77ee638-b1c9-471c-a19f-7a4672bc86d0',
        name: 'ASLT_DCBL_VDL-yanhua-test',
        createdBy: {
          userId: 'yzhang31@slb.com',
        },
        creationTime: '2022-07-20T07:48:23.5443734+00:00',
        visibleScope: {
          wellIds: ['7c0eb4ab-b1d4-43de-861a-118649e766a0'],
        },
      },
    ],
  },
  {
    name: 'My Template',
    children: [
      {
        id: 'c44a7942-6956-4c5c-bf5a-516ec180251b',
        name: 'ASLT_DCBL_VDL-yanhua-test',
        createdBy: {
          userId: 'rchauhan10@slb.com',
        },
        creationTime: '2022-07-26T08:51:30.4900504+00:00',
        visibleScope: {
          wellIds: ['7c0eb4ab-b1d4-43de-861a-118649e766a0'],
        },
      },
      {
        id: '89ff7ebc-ecc7-4418-a9c7-b7b3eb3f1f76',
        name: 'ASLT_DCBL_VDL-yanhua-test',
        createdBy: {
          userId: 'rchauhan10@slb.com',
        },
        creationTime: '2022-07-26T08:48:53.3325537+00:00',
        visibleScope: {
          wellIds: ['7c0eb4ab-b1d4-43de-861a-118649e766a0'],
        },
      },
      {
        id: 'a77ee638-b1c9-471c-a19f-7a4672bc86d0',
        name: 'ASLT_DCBL_VDL-yanhua-test',
        createdBy: {
          userId: 'yzhang31@slb.com',
        },
        creationTime: '2022-07-20T07:48:23.5443734+00:00',
        visibleScope: {
          wellIds: ['7c0eb4ab-b1d4-43de-861a-118649e766a0'],
        },
      },
    ],
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

/**
 * @title Tree with flat nodes
 */
@Component({
  selector: 'tree-flat-overview-example',
  templateUrl: 'tree-flat-overview-example.html',
  styleUrls: ['tree-flat-overview-example.css'],
})
export class TreeFlatOverviewExample {
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  // filter recursively on a text string using property object value
  filterRecursive(filterText: string, array: any[], property: string) {
    let filteredData;

    //make a copy of the data so we don't mutate the original
    function copy(o: any) {
      return Object.assign({}, o);
    }

    // has string
    if (filterText) {
      // need the string to match the property value
      filterText = filterText.toLowerCase();
      // copy obj so we don't mutate it and filter
      filteredData = array.map(copy).filter(function x(y) {
        if (y[property].toLowerCase().includes(filterText)) {
          return true;
        }
        // if children match
        if (y.children) {
          return (y.children = y.children.map(copy).filter(x)).length;
        }
      });
      // no string, return whole array
    } else {
      filteredData = array;
    }

    return filteredData;
  }

  // pass mat input string to recursive function and return data
  filterTree(filterText: string) {
    // use filter input text, return filtered TREE_DATA, use the 'name' object value
    this.dataSource.data = this.filterRecursive(filterText, TREE_DATA, 'name');
  }

  // filter string from mat input filter
  applyFilter(filterText: string) {
    this.filterTree(filterText);
    // show / hide based on state of filter string
    if (filterText) {
      this.treeControl.expandAll();
    } else {
      this.treeControl.collapseAll();
    }
  }
}

/**  Copyright 2021 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
