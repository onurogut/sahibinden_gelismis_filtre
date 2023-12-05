document.addEventListener('DOMContentLoaded', function() {
    // Load the stored values on page load
    chrome.storage.sync.get(['valueList'], function(result) {
        if (result.valueList && result.valueList.length > 0) {
            result.valueList.forEach(function(value) {
                addToFilterList(value);
            });
        }
    });

    document.getElementById('submit').addEventListener('click', function() {
        var valueInput = document.getElementById('value');
        var value = valueInput.value;

        // Retrieve the existing values from storage
        chrome.storage.sync.get(['valueList'], function(result) {
            // If the list doesn't exist yet, create it
            var valueList = result.valueList || [];

            // Add the new value to the list
            valueList.push(value);

            // Store the updated list in chrome.storage
            chrome.storage.sync.set({
                'valueList': valueList
            });

            // Update the filter list in the popup
            addToFilterList(value);

            // Execute script in the active tab
            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function(tabs) {
                chrome.tabs.executeScript(tabs[0].id, {
                    code: 'var valueList = ' + JSON.stringify(valueList) + '; ' +
                        'document.querySelectorAll("tr.searchResultsItem td.searchResultsTagAttributeValue").forEach(function(item) { ' +
                        '  if (valueList.some(function(value) { return item.textContent.includes(value); })) { ' +
                        '    item.closest("tr").style.display = "none"; ' +
                        '  } ' +
                        '});'
                });
            });

            // Clear the input field after submitting
            valueInput.value = '';
        });
    });

    function clearFilterStorage() {
        // Retrieve the existing values from storage
        chrome.storage.sync.get(['valueList'], function(result) {
            var valueList = result.valueList || [];

            // Execute script in the active tab for each value
            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function(tabs) {
                var remainingScripts = valueList.length;

                valueList.forEach(function(value) {
                    chrome.tabs.executeScript(tabs[0].id, {
                        code: 'var selectedValue = "' + value + '"; ' +
                            'document.querySelectorAll("tr.searchResultsItem td.searchResultsTagAttributeValue").forEach(function(item) { ' +
                            '  if (item.textContent.includes(selectedValue)) { ' +
                            '    item.closest("tr").style.display = ""; ' +
                            '  } ' +
                            '});'
                    }, function() {
                        // This callback will be executed after each script is executed

                        remainingScripts--;

                        if (remainingScripts === 0) {
                            // Clear filterList after executing scripts for all values
                            clearFilterList();

                            // Clear all entries in chrome.storage after executing scripts for each value
                            chrome.storage.sync.clear();
                        }
                    });
                });
            });
        });
    }


    document.getElementById('clearFilter').addEventListener('click', function() {
        // Clear the filter list in the popup
        clearFilterList();


        clearFilterStorage();

        // Clear a specific record from chrome.storage
        clearSpecificRecord();

        // Update the filter list in the popup
        updateFilterList();
    });

    function addToFilterList(value) {
        var filterList = document.getElementById('filterList');
        var listItem = document.createElement('li');

        // Create a delete icon using inline SVG
        var deleteIcon = document.createElement('span');
        deleteIcon.innerHTML = '<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" fill="red" class="bi bi-x" viewBox="0 0 16 16">' +
            '<path d="M3 3.354a.5.5 0 0 1 .708 0L8 7.293l4.146-4.147a.5.5 0 0 1 .708.708L8.707 8l4.147 4.146a.5.5 0 0 1-.708.708L8 8.707l-4.146 4.147a.5.5 0 0 1-.708-.708L7.293 8 3.146 3.854a.5.5 0 0 1 0-.708z"/>' +
            '</svg>';

        // Add the text content and delete icon to the list item
        listItem.appendChild(document.createTextNode(value));
        listItem.appendChild(deleteIcon);

        // Add the list item to the filterList
        filterList.appendChild(listItem);

        // Attach a click event listener to the delete icon for removal
        deleteIcon.addEventListener('click', function() {
            removeValueFromList(value);
        });
    }

    // Add a function to remove a specific value from the list
    function removeValueFromList(value) {
        // Retrieve the existing values from storage
        chrome.storage.sync.get(['valueList'], function(result) {
            var valueList = result.valueList || [];

            // Remove the specified value from the list
            var index = valueList.indexOf(value);
            if (index !== -1) {
                valueList.splice(index, 1);
            }

            // Store the updated list in chrome.storage
            chrome.storage.sync.set({
                'valueList': valueList
            });

            // Update the filter list in the popup
            updateFilterList();

            // Execute script in the active tab to clear the filter for the specific value
            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function(tabs) {
                chrome.tabs.executeScript(tabs[0].id, {
                    code: 'var selectedValue = "' + value + '"; ' +
                        'document.querySelectorAll("tr.searchResultsItem td.searchResultsTagAttributeValue").forEach(function(item) { ' +
                        '  if (item.textContent.includes(selectedValue)) { ' +
                        '    item.closest("tr").style.display = ""; ' +
                        '  } ' +
                        '});'
                });
            });
        });
    }

    function clearFilterList() {
        var filterList = document.getElementById('filterList');
        filterList.innerHTML = '';
    }

    function clearSpecificRecord() {
        // Your logic to clear a specific record in chrome.storage
        // For example, if you have a key 'valueList' in chrome.storage
        chrome.storage.sync.get("valueList", function(result) {
            var valueList = result.valueList || [];

            // Your logic to identify and remove the specific record
            // For example, removing the first item in the array
            if (valueList.length > 0) {
                valueList.splice(0, 1);
            }

            // Save the updated valueList back to chrome.storage
            chrome.storage.sync.set({
                'valueList': valueList
            });
        });
    }

    function updateFilterList() {
        // Get the filterList ul element
        var filterListElement = document.getElementById('filterList');

        // Fetch the updated valueList from chrome.storage
        chrome.storage.sync.get("valueList", function(result) {
            var valueList = result.valueList || [];

            // Clear existing items in the filterList
            filterListElement.innerHTML = '';

            // Add each item in valueList to the filterList
            valueList.forEach(function(item) {
                addToFilterList(item);
            });
        });
    }
});