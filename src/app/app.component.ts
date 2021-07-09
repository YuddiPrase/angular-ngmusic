import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  selectedPage: String;
  searchParam: String;
  modalSearch: boolean;
  listSong: any[];

  constructor() {
    this.selectedPage = 'home';
    this.modalSearch = false;
    this.listSong = [];
  }


  goTo(value: String) {
    this.selectedPage = value;
    if (value === 'results') {
      const requestOptions: any = {
        method: 'GET',
        redirect: 'follow'
      };
      fetch(`https://itunes.apple.com/search?term=${this.searchParam}`, requestOptions)
        .then(response => response.text())
        .then((res: any) => {
          if (res) {
            try {
              const ls = JSON.parse(res);
              if (ls && ls.results && ls.results.length > 0) {
                this.listSong = ls.results;
              }
            } catch (x) {
              console.warn(x);
            }
          }
        })
        .catch(error => console.log('error', error));
    }
  }

  setModalSearch() {
    this.modalSearch = !this.modalSearch;
  }



}
