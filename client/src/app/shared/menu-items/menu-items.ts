import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

const MENUITEMS = [
    {
        state: 'admins',
        name: 'Admins',
        type: 'link',
        icon: 'arrows-glide'
    },
    {
        state: 'users',
        name: 'Users',
        type: 'link',
        icon: 'basic-paperplane'
    },
    // {
    //     state: 'hardwareversions',
    //     name: 'Hardware Versions',
    //     type: 'link',
    //     icon: 'basic-floppydisk'
    // },
    // {
    //     state: 'hardwarecomponents',
    //     name: 'Hardware Components',
    //     type: 'link',
    //     icon: 'basic-archive'
    // },
    // {
    //     state: 'firmwareversions',
    //     name: 'Firmware Versions',
    //     type: 'link',
    //     icon: 'basic-webpage-multiple'
    // },
    // {
    //     state: 'productmodels',
    //     name: 'Product Models',
    //     type: 'link',
    //     icon: 'basic-server'
    // },
    // {
    //     state: 'softgoodsmodels',
    //     name: 'Softgoods Models',
    //     type: 'link',
    //     icon: 'basic-display'
    // },
    // {
    //     state: 'softgoodsversions',
    //     name: 'Softgoods Versions',
    //     type: 'link',
    //     icon: 'basic-target'
    // },
    // {
    //     state: 'productversions',
    //     name: 'Product Versions',
    //     type: 'link',
    //     icon: 'basic-postcard'
    // },
    // {
    //     state: 'products',
    //     name: 'Products',
    //     type: 'link',
    //     icon: 'ecommerce-sales'
    // },
    // {
    //     state: 'productconfigs',
    //     name: 'Product Configs',
    //     type: 'link',
    //     icon: 'basic-gear'
    // },
    // {
    //     state: 'productconfigrevisions',
    //     name: 'Product Config Revisions',
    //     type: 'link',
    //     icon: 'basic-life-buoy'
    // },
    {
        state: 'storagesessions',
        name: 'Storage Sessions',
        type: 'link',
        icon: 'basic-server2'
    },
    // {
    //     state: 'annotations',
    //     name: 'Annotations',
    //     type: 'link',
    //     icon: 'basic-accelerator'
    // },
    {
        state: 'apicommandsequences',
        name: 'Api Command Sequences',
        type: 'link',
        icon: 'basic-map'
    },
    {
        state: 'apicommandsequencerevisions',
        name: 'Api Command Sequence R..',
        type: 'link',
        icon: 'basic-spread-bookmark'
    },
    // {
    //     state: 'dashboard',
    //     name: 'HOME',
    //     type: 'link',
    //     icon: 'basic-accelerator'
    // },
    // {
    //     state: 'functionalmovements',
    //     name: 'Functional Movements',
    //     type: 'link',
    //     icon: 'basic-message-txt'
    // },
    // {
    //     state: 'finitestatemachines',
    //     name: 'Finite State Machines',
    //     type: 'link',
    //     icon: 'software-scale-reduce'
    // },
    // {
    //     state: 'tests',
    //     name: 'Tests',
    //     type: 'link',
    //     icon: 'ecommerce-graph1'
    // },
    // {
    //     state: 'notifications',
    //     name: 'Notifications',
    //     type: 'link',
    //     icon: 'music-bell'
    // }
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  add(menu: Menu) {
    MENUITEMS.push(menu);
  }
}
