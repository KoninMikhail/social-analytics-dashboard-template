import Select from "./components/select/select.component.js";
import Toggle from "./components/toggle/toggle.component";
import Notifier from "./components/notifer/notifier.component";
import Hamburger from "./components/hamburger/hamburger.component";
import {mobileMenuSwitchState} from "./helpers/mobileMenuSwitchState";

(function(){

    /* ==================================== */
    /* Сomponents */
    /* ==================================== */

    // Select for widget 'Source of Revenue'
    const selectSourceOfRevenue =  new Select('.js-source-of-revenue-filter', {
        name: 'source-of-revenue',
        targetValue: 'all',
        options: [
            ['all', 'All Time'],
            ['year', 'Year'],
            ['month', 'Month'],
            ['week', 'Week'],
            ['day', 'Day'],
        ]
    });

    // Select for widget 'Premium content statistics'
    const selectPremiumContentStatistics =  new Select('.js-premium-content-statistics-filter', {
        name: 'premium-content-statistics',
        targetValue: 'all',
        options: [
            ['all', 'All Time'],
            ['year', 'Year'],
            ['month', 'Month'],
            ['week', 'Week'],
            ['day', 'Day'],
        ]
    });

    // Notifier
    const notifier = new Notifier('.notifier');

    // Get Notify
    setTimeout(() =>{
        notifier.alert();
    },4000);

    // Theme switcher
    const themeSwitcher = new Toggle('.toggle', false, () =>{
        document.body.classList.toggle('theme-dark')
    });

    // Mobile menu
    const mobileMenuTriggerButton = new Hamburger('.hamburger', false, () =>{
        mobileMenuSwitchState('.sidebar','.sidebar__item');
    });

}());
