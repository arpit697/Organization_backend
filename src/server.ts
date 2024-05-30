import { Application } from './app/app';

try {
    Application.init();
} catch (error:any) {
    console.error(error.message);
}