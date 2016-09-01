/**
 * Created with IntelliJ IDEA.
 * User: Mohammed Shaik
 *
 * scripts - A script file containing all the logic implementation
 * for Contact/Address Management.
 */

(function() {
    'use strict';

    /*- Contacts Interface -*/
    var Contacts = {
        init: function() {},
        addContact: function(contactObj) {},
        removeContact: function() {}
    };

    /*- Contacts Implementation -*/
    var ContactsImpl = function() {};

    ContactsImpl.prototype = Object.create(Contacts);

    ContactsImpl.prototype.init = function() {
        this.sortDir = false;
        // Get the list element
        ContactsImpl.prototype.contactsList = document.getElementById('contactsList');
        // Get the form element
        ContactsImpl.prototype.formAddContact = document.getElementById('formAddContact');
        // Get the submit button
        this.deleteBtn = document.getElementById('deleteBtn');
        // Get the sort by name button
        this.sortByName = document.getElementById('sortByName');
        // Get the sort by name button
        this.sortByLName = document.getElementById('sortByLName');
        // Get the sort by telephone button
        this.sortByPhone = document.getElementById('sortByPhone');
        // Get the sort asc desc span elements
        ContactsImpl.prototype.nameAsc = document.getElementById('nameAsc');
        ContactsImpl.prototype.nameDesc = document.getElementById('nameDesc');
        ContactsImpl.prototype.lNameAsc = document.getElementById('lNameAsc');
        ContactsImpl.prototype.lNameDesc = document.getElementById('lNameDesc');
        ContactsImpl.prototype.phoneAsc = document.getElementById('phoneAsc');
        ContactsImpl.prototype.phoneDesc = document.getElementById('phoneDesc');
        // Reset the form
        ContactsImpl.prototype.formAddContact.reset();
        // Bind submit event
        ContactsImpl.prototype.formAddContact.addEventListener("submit", function(event) {
            var contact = {
                first_name: this.firstName.value,
                last_name: this.lastName.value,
                telephone: this.telephone.value,
                email: this.email.value
            };
            contactsController.add(contact);
            this.reset();
            event.preventDefault();
        }, true);

        // Delete event binding
        this.deleteBtn.addEventListener("click", function(event) {
            contactsController.delete();
        }, true);

        // Bind sort by first name event
        this.sortByName.addEventListener("click", function(event) {
            this.sortDir = !this.sortDir;
            var sortDir = this.sortDir ? 'desc' : 'asc';
            ContactsImpl.prototype.phoneDesc.style.visibility = 'hidden';
            ContactsImpl.prototype.phoneAsc.style.visibility = 'hidden';
            ContactsImpl.prototype.lNameDesc.style.visibility = 'hidden';
            ContactsImpl.prototype.lNameAsc.style.visibility = 'hidden';
            contactsController.sort(contactsImpl.contactsList, sortDir, false, null);
            if(sortDir == 'asc') {
                ContactsImpl.prototype.nameDesc.style.visibility = 'hidden';
                ContactsImpl.prototype.nameAsc.style.visibility = 'visible';
            } else {
                ContactsImpl.prototype.nameDesc.style.visibility = 'visible';
                ContactsImpl.prototype.nameAsc.style.visibility = 'hidden';
            }
        }, true);

        // Bind sort by last name event
        this.sortByLName.addEventListener("click", function(event) {
            this.sortDir = !this.sortDir;
            var sortDir = this.sortDir ? 'desc' : 'asc';
            ContactsImpl.prototype.phoneDesc.style.visibility = 'hidden';
            ContactsImpl.prototype.phoneAsc.style.visibility = 'hidden';
            ContactsImpl.prototype.nameDesc.style.visibility = 'hidden';
            ContactsImpl.prototype.nameAsc.style.visibility = 'hidden';
            contactsController.sort(contactsImpl.contactsList, sortDir, false, 'lName');
            if(sortDir == 'asc') {
                ContactsImpl.prototype.lNameDesc.style.visibility = 'hidden';
                ContactsImpl.prototype.lNameAsc.style.visibility = 'visible';
            } else {
                ContactsImpl.prototype.lNameDesc.style.visibility = 'visible';
                ContactsImpl.prototype.lNameAsc.style.visibility = 'hidden';
            }
        }, true);

        // Bind sort by phone event
        this.sortByPhone.addEventListener("click", function(event) {
            this.sortDir = !this.sortDir;
            var sortDir = this.sortDir ? 'desc' : 'asc';
            ContactsImpl.prototype.nameDesc.style.visibility = 'hidden';
            ContactsImpl.prototype.nameAsc.style.visibility = 'hidden';
            ContactsImpl.prototype.lNameDesc.style.visibility = 'hidden';
            ContactsImpl.prototype.lNameAsc.style.visibility = 'hidden';
            contactsController.sort(contactsImpl.contactsList, sortDir, true, null);
            if(sortDir == 'asc') {
                ContactsImpl.prototype.phoneDesc.style.visibility = 'hidden';
                ContactsImpl.prototype.phoneAsc.style.visibility = 'visible';
            } else {
                ContactsImpl.prototype.phoneDesc.style.visibility = 'visible';
                ContactsImpl.prototype.phoneAsc.style.visibility = 'hidden';
            }
        }, true);

    };

    ContactsImpl.prototype.addContact = function(contactObj) {
        //Add contact implementation
        var $option = document.createElement("option");
        //Setting phone no. in value so we can sort by telephone
        $option.setAttribute('value', ''+contactObj.telephone);
        $option.setAttribute('lname', ''+contactObj.last_name);
        $option.text += contactObj.first_name + " " + contactObj.last_name + " |";

        $option.text += " "+contactObj.telephone + " |";
        $option.text += " "+contactObj.email;
        contactsImpl.contactsList.appendChild($option);
    };

    ContactsImpl.prototype.removeContact = function() {
        var contactsList = contactsImpl.contactsList;

        // Remember selected items.
        var selected = [];
        for (var i = 0; i < contactsList.length; i++) {
            if (contactsList.options[i].selected) {
                selected[i] = contactsList.options[i].selected;
            }
        }
        i = contactsList.options.length;
        while(i--) {
            if(selected[i]) {
                contactsList.remove(i);
            }
        }
    };

    ContactsImpl.prototype.sortList = function(select, sortDir, value, sortBy) {
        value = typeof value == 'boolean' ? value : false;
        sortDir = ['asc','desc'].indexOf(sortDir) > -1 ? sortDir : 'asc';

        if(!select) return false;
        var opts = select.getElementsByTagName('option');

        var options = [];
        for(var i in opts) {
            if(parseInt(i)==i) {
                options.push(opts[i]);
            }
        }
        if(sortBy == 'lName')
            options.sort(this.sortLName);
        else
            options.sort(value ? this.sortVals : this.sortText);
        if(sortDir == 'desc') {
            options.reverse();
        }
        options.reverse();
        for(var i in options) {
            select.insertBefore(options[i],select.getElementsByTagName('option')[0]);
        }

        this.sortText = function(a,b) {
            return a.innerHTML > b.innerHTML ? 1 : -1;
        }
        this.sortVals = function(a,b) {
            return a.value > b.value ? 1 : -1;
        }
        // Sort By Last Name using custom attribute lname
        this.sortLName = function(a,b) {
            return a.attributes.lname.value > b.attributes.lname.value ? 1 : -1;
        }

    };

    var ContactsController = function(contactsImpl) {
        this.contactsImpl = contactsImpl;
    };

    ContactsController.prototype.add = function(item) {
        contactsImpl.addContact(item);
    };

    ContactsController.prototype.delete = function() {
        contactsImpl.removeContact();
    };

    ContactsController.prototype.sort = function(select, sortDir, value, sortBy) {
        contactsImpl.sortList(select, sortDir, value, sortBy);
    };

    ContactsController.prototype.init = function() {
        contactsImpl.init();
    };

    var contactsImpl = new ContactsImpl();
    var contactsController = new ContactsController(contactsImpl);

    // make sure the document is loaded and then call init
    window.onload = contactsController.init;

})();
