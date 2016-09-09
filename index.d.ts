import { View } from "ui/core/view";


/**
 * Get the child element with the id. ** NativeScript DOM plugin only **
 * @param {string} id - The id of the element to get.
 * @returns {View} - The view element with the specified id.
 */
export function getElementById(id: string): View;


/**
 * Gets all child elements of the parent view with the specified className. ** NativeScript DOM plugin only **
 * @param {string} className - The class name to get children elements with.
 * @returns {Array} - An array of view elements with the specified class name.
 */
export function getElementsByClassName(className: string): View;


/**
 * Gets all child elements with specified tag name in the parent view. ** NativeScript DOM plugin only **
 * @param {string} tagName - The tag name to get children elements with.
 * @returns {Array} - An array of view elements with the specified tag name.
 */
export function getElementsByTagName(tagName: string): View;


/**
 * Execute a function on any view with the id. ** NativeScript DOM plugin only **
 * @param {string} id - The view id.
 */
export function runAgainstId(id: string, func: Function);


/**
 * Executes a function on all view components with the className. ** NativeScript DOM plugin only **
 * @param {string} tagName - The tag name to get children elements with.
 */
export function runAgainstClasses(className: string, func: Function);


/**
 * Executes a function on all view components with the tagName. ** NativeScript DOM plugin only **
 * @param {string} tagName - The tag name to get children elements with.
 */
export function runAgainstTagNames(tagName: string, func: Function);


declare module "ui/core/view" {
    interface View {

        /**
         * Get the child element with the id. ** NativeScript DOM plugin only **
         * @param {string} id - The id of the element to get.
         * @returns {View} - The view element with the specified id.
         */
        getElementById(id: string);

        /**
         * Gets all child elements of the parent view with the specified className. ** NativeScript DOM plugin only **
         * @param {string} className - The class name to get children elements with.
        * @returns {Array} - An array of view elements with the specified class name.
         */
        getElementsByClassName(className: string);

        /**
         * Gets all child elements with specified tag name in the parent view. ** NativeScript DOM plugin only **
         * @param {string} tagName - The tag name to get children elements with.
         * @returns {Array} - An array of view elements with the specified tag name.
         */
        getElementsByTagName(tagName: string);


        /**
         * Execute a function on any view with the id. ** NativeScript DOM plugin only **
         * @param {string} id - The view id.
         */
        runAgainstId(id: string);

        /**
         * Executes a function on all view components with the className. ** NativeScript DOM plugin only **
         * @param {string} tagName - The tag name to get children elements with.
         */
        runAgainstClasses(className: string);


        /**
         * Executes a function on all view components with the tagName. ** NativeScript DOM plugin only **
         * @param {string} tagName - The tag name to get children elements with.
         */
        runAgainstTagNames(tagName: string);


        /**
         * Property that contains the CSS classes for a view component.
         */
        classList: classList;

    }


}

interface classList {

    /**
     * Add a class to the view's class list at the end.
     * @param {string} className - The class to add.
     */
    add(className: string);

    /**
     * Add a class to the view's class list at the front.
     * @param {string} className - The class to add.
     */
    insert(className: string);

    /**
     * Removes a class from the view's class list
     * @param {string} className - The class to remove.
     */
    remove(className: string);

    /**
     * Toggles a class name if force = true, will force adding the class name only. (And won't remove it, but you won't have a second) if force = false, will force removing the class name only. (And won't add it)
     * @param {string} className - The class to toggle.
     */
    toggle(className: string);

    /**
    * Get the class at the specified location in the classList.
    * @param {any} index - The class item in the classList.
    * @returns - The class at the index of the classList.
    */
    item(index: number);

    /**
     * Check if a view has a class name.
     * @param {any} id - The class item in the classList.
     * @returns - True if the class name exists in the class list.
     */
    contains(id: any);
}    