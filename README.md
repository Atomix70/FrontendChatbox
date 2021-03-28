# Chatapp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

1.Replace the 192.168.18.57 in the environment.ts file with your publicIP address.
2.ng serve --host youripaddress
3.The video chat option works only in chrome and you have to set chrome flag treat insecure origin as secure.This is due to lack of SSL certificate.
4. go to chrome://flags
5. find treat insecure origins as secure 
6. enter your ipaddress and port value and relaunch.eg http://192.168.18.57:4200
7. do this for both the systems.

