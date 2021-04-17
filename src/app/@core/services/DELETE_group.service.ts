import { Injectable } from "@angular/core";
import { ApolloService } from "./apollo.service";
import gql from "graphql-tag";
import { Group } from "app/@core/models";
import { Service } from "./service";
import { ActivityService } from "./activity.service";

@Injectable({ providedIn: "root" })
export class GroupService extends Service {
  constructor(protected apollo: ApolloService) {
    super(apollo);
    this.fragment = GroupService.fragment;
  }
  converToModel(x) {
    return new Group().deserialize(x);
  }
  toModel = this.converToModel;
  saveQuery = gql`
    mutation saveGroup($input: groupInput!) {
      saveGroup(input: $input)
    }
  `;
  removeQuery = gql`
    mutation removeGroup($input: groupInput!) {
      removeGroup(input: $input)
    }
  `;
  oneQuery = gql`
    query group($input: groupInput) {
      group(input: $input) {
        ...groupFragment
      }
    }
  `;
  listQuery = gql`
    query groups($input: groupInput) {
      groups(input: $input) {
        ...groupFragment
      }
    }
  `;
  static fragment = gql`
    fragment groupFragment on Group {
      __typename
      _id
      name
      options
      main
      activities
      _activities {
        ...activityFragment
      }
    }
    ${ActivityService.fragment}
  `;
}