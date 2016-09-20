'use babel';
/* @flow */

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import type {
  Action,
  CommitState,
  DiffModeType,
  FileDiffState,
  PublishState,
  RepositoryAction,
  RepositoryState,
} from '../types';
import type {HgRepositoryClient} from '../../../nuclide-hg-repository-client';

import * as ActionTypes from './ActionTypes';
import invariant from 'assert';
import {
  getEmptyActiveRepositoryState,
  getEmptyCommitState,
  getEmptyFileDiffState,
  getEmptyPublishState,
  getEmptyRebaseOnAmendState,
  getEmptyRepositoriesState,
  getEmptyRepositoryState,
  getEmptyViewModeState,
} from './createEmptyAppState';

export function activeRepository(
  state: ?HgRepositoryClient,
  action: Action,
): ?HgRepositoryClient {
  switch (action.type) {
    case ActionTypes.UPDATE_ACTIVE_REPOSITORY:
      return action.payload.hgRepository;
  }
  return state || getEmptyActiveRepositoryState();
}

export function repositories(
  state: Map<HgRepositoryClient, RepositoryState>,
  action: Action,
): Map<HgRepositoryClient, RepositoryState> {
  switch (action.type) {
    case ActionTypes.SET_COMPARE_ID:
    case ActionTypes.UPDATE_DIRTY_FILES:
    case ActionTypes.UPDATE_SELECTED_FILES:
    case ActionTypes.UPDATE_HEAD_TO_FORKBASE_REVISIONS:
    case ActionTypes.SET_DIFF_OPTION: {
      const {repository} = action.payload;
      const oldRepositoryState = state.get(repository);
      invariant(oldRepositoryState != null);
      return new Map(state)
        .set(repository, reduceRepositoryAction(oldRepositoryState, action));
    }
    case ActionTypes.ADD_REPOSITORY: {
      const {repository} = action.payload;
      return new Map(state)
          .set(repository, getEmptyRepositoryState());
    }
    case ActionTypes.REMOVE_REPOSITORY: {
      const {repository} = action.payload;
      const newRepositories = new Map(state);
      newRepositories.delete(repository);
      return newRepositories;
    }
  }
  return state || getEmptyRepositoriesState();
}

function reduceRepositoryAction(
  repositoryState: RepositoryState,
  action: RepositoryAction,
): RepositoryState {
  switch (action.type) {
    case ActionTypes.SET_DIFF_OPTION:
      return {
        ...repositoryState,
        diffOption: action.payload.diffOption,
      };
    case ActionTypes.SET_COMPARE_ID:
      return {
        ...repositoryState,
        compareRevisionId: action.payload.compareId,
      };
    case ActionTypes.UPDATE_DIRTY_FILES:
      return {
        ...repositoryState,
        dirtyFiles: action.payload.dirtyFiles,
      };
    case ActionTypes.UPDATE_SELECTED_FILES:
      return {
        ...repositoryState,
        selectedFiles: action.payload.selectedFiles,
      };
    case ActionTypes.UPDATE_HEAD_TO_FORKBASE_REVISIONS:
      return {
        ...repositoryState,
        headToForkBaseRevisions: action.payload.headToForkBaseRevisions,
      };
    default:
      throw new Error('Invalid Repository Action!');
  }
}

export function commit(
  state: CommitState,
  action: Action,
): CommitState {
  return state || getEmptyCommitState();
}

export function publish(
  state: PublishState,
  action: Action,
): PublishState {
  return state || getEmptyPublishState();
}

export function fileDiff(
  state: FileDiffState,
  action: Action,
): FileDiffState {
  switch (action.type) {
    case ActionTypes.UPDATE_FILE_DIFF:
      return action.payload.fileDiff;
  }
  return state || getEmptyFileDiffState();
}

export function shouldRebaseOnAmend(
  state: boolean,
  action: Action,
): boolean {
  return state || getEmptyRebaseOnAmendState();
}

export function viewMode(
  state: DiffModeType,
  action: Action,
): DiffModeType {
  return state || getEmptyViewModeState();
}