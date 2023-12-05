chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete' && tab.active) {
        chrome.storage.sync.get("valueList", function(result) {
            var valueList = result.valueList;
            // alert("storage: " + JSON.stringify(valueList));

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


        })


    }
});