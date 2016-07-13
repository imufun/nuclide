'use babel';
/* @flow */

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import type {ActionTypeValue} from './types';


export const ActionType = Object.freeze({
  ADD_PROJECT_REPOSITORY: 'add-project-repository',
  UPDATE_PANE_ITEM_STATE: 'update-pane-item-state',
  REMOVE_PROJECT_REPOSITORY: 'remove-project-repository',
  UPDATE_REPOSITORY_BOOKMARKS: 'update-repository-bookmarks',
});

// This is to work around flow's missing support of enums.
(ActionType: { [key: string]: ActionTypeValue });

export const EMPTY_SHORTHEAD = '';
