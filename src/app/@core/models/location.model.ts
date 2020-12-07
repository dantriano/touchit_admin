import { Injectable } from "@angular/core";
import { LocationData, Location } from "../data/location";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { ConfigurationModel } from "./configuration.model";

@Injectable()
export class LocationModel extends LocationData {
  private _locations: Location[] = [];
  private _location: Location;
  constructor(private apollo: Apollo) {
    super();
  }
  set location(location: Location) {
    this._location = location;
  }
  get location() {
    return this._location;
  }
  set locations(locations: Location[]) {
    this._locations = locations;
  }
  get locations() {
    return this._locations;
  }
  load(input: any) {
    const configInput = {
      status: "active",
      companies: input.company,
      //value: { sections: "locationOptions" },
    };
    const location = {};
    const query = gql`
      query($configuration: configurationInput!, $location: locationInput) {
        configuration(input: $configuration) {
          ...configFragment
        }
        location(input: $location) {
          _id
          name
          center {
            lat
            lng
          }
          zones {
            latsLngs {
              lat
              lng
            }
          }
        }
      }
      ${ConfigurationModel.getFragment()}
    `;
    return this.apollo.watchQuery<any>({
      query: query,
      variables: { configuration: configInput, location: input },
      fetchPolicy: "network-only",
    }).valueChanges;
  }
  getList(input: object) {
    const query = gql`
      query locations($input: locationInput) {
        locations(input: $input) {
          _id
          name
        }
      }
    `;
    return this.apollo.watchQuery<any>({
      query: query,
      variables: { input: input },
      fetchPolicy: "network-only",
    }).valueChanges;
  }

  getOne(input: object) {
    const query = gql`
      query($input: locationInput!) {
        location(input: $input) {
          _id
          name
          options
          center {
            lat
            lng
          }
          zones {
            latsLngs {
              lat
              lng
            }
          }
        }
      }
    `;
    return this.apollo.watchQuery<any>({
      query: query,
      variables: { input: input },
      fetchPolicy: "network-only",
    }).valueChanges;
  }

  save(input: Location) {
    const mutation = gql`
      mutation saveLocation($input: locationInput) {
        saveLocation(input: $input)
      }
    `;
    return this.apollo.mutate<any>({
      mutation: mutation,
      variables: { input: input },
    });
  }

  remove(id: string) {
    const mutation = gql`
      mutation removeLocation($id: ID!) {
        removeLocation(_id: $id)
      }
    `;
    return this.apollo.mutate<any>({
      mutation: mutation,
      variables: { id: id },
    });
  }
  static getFragment() {
    return gql`
      fragment locationFragment on Location {
        __typename
        _id
        name
        center {
          lat
          lng
        }
        zones {
          latsLngs {
            lat
            lng
          }
        }
      }
    `;
  }
}
