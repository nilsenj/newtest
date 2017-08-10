import {Component, OnInit} from '@angular/core';
import {GeolocationService} from "../_services/geolocation.service";
import {CoordinatorService} from "../_services/coordinator.service";
import {Router} from "@angular/router";
import {UberProposalsService} from "../_services/uber-proposals.service";
import {Proposal} from "../_models/proposal";
import {arrays} from "../_helpers/arrays";

@Component({
  selector: 'app-uber-coordinator',
  templateUrl: './uber-coordinator.component.html',
  styleUrls: ['./uber-coordinator.component.scss'],
})

export class UberCoordinatorComponent implements OnInit {

  // just initial coordinates
  address = {
    latitude: 51.678418,
    longitude: 7.809007
  };
  destination = {
    latitude: 51,
    longitude: 7.209007
  };
  zoom: number = 9;

  location = {};
  model: any = {};
  proposals: Proposal[];
  loading = false;
  uberReady = false;
  error = '';

  discount: 0.2;

  constructor(private router: Router,
              protected GeolocationService: GeolocationService,
              protected coordinatorService: CoordinatorService,
              protected uberProposals: UberProposalsService) {
  }

  ngOnInit() {
    this.getLocation();
  }

  /**
   * get location coordinates
   */
  getLocation() {
    this.GeolocationService.getLocation([true, Infinity, 3600]).subscribe(position => {
      this.location = position;
    });
  }

  /**
   * get uber product prices
   * and estimates
   */
  getUberProposals() {
    this.uberProposals.run(this.address, this.destination).subscribe(proposal => {
      if (proposal) {
        this.proposals = arrays.transformToArray(proposal);
        this.uberReady = true;
      } else {
        this.uberReady = false;
      }
    });
  }

  /**
   * get coordinates
   */
  getCoordinates(): void {
    this.loading = true;
    this.coordinatorService.run(this.model.address, this.model.destination)
      .subscribe(result => {
        if (result) {
          this.address = result.address;
          this.destination = result.destination;
          this.loading = false;
          this.getUberProposals();
        } else {
          this.error = 'Sorry coordinates not found';
          this.loading = false;
        }
      }, () => {
        this.error = 'Sorry error appeared during getting coordinates';
        this.loading = false;
      });
  }

  /**
   * reformat string
   *
   * @param index
   * @param proposal
   * @returns {any}
   */
  reformat(index, proposal): Proposal {
    proposal.newName = "After" + proposal.localized_display_name;
    let myPrice = proposal.estimate;
    let newPrice = myPrice.substr(1);
    let priceArr = newPrice.split('-');
    console.log(proposal);
    let newPriceArr = [];
    for (let i = 0; i <= priceArr.length; i++) {
      var value = priceArr[index];
      let priceTag = Number(parseInt(value) - (parseInt(value) * this.discount));
      newPriceArr.push(priceTag)
    }
    proposal.newPrice = '$' + priceArr.join('-');
    return proposal;
  }

}
