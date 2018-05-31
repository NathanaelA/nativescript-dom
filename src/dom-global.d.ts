declare module 'nativescript-dom-global' {

    import * as TNSDom from 'nativescript-dom';

    global {
        var getElementById: typeof TNSDom.getElementById;
        var getElementsByClassName: typeof TNSDom.getElementsByClassName;
        var getElementsByTagName: typeof TNSDom.getElementsByTagName;
        var runAgainstClasses: typeof TNSDom.runAgainstClasses;
        var runAgainstId: typeof TNSDom.runAgainstId;
        var runAgainstTagNames: typeof TNSDom.runAgainstTagNames;
    }
}