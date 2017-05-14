function SchoolModel(data) {
    if (!data) {
        data = {};
    }
    var self = this;
    self.Name = data.Name;
    self.Address = data.Address;
    self.County = data.County;
    self.Irish = data.Irish;
    self.DEIS = data.DEIS;
    self.Religion = data.Religion;
    self.Boys = data.Boys;
    self.Girls = data.Girls;
    self.Total = data.Total
    self.RollNo = data.RollNo;
}

function PageModel(data) {
    if (!data) {
        data = {};
    }
    var self = this; //to avoid

    self.schoollist = ExtractModels(self, data.primaryschools, SchoolModel);

    self.columns = data.columns;
    var countyarray = createfilteroptionarray(data.counties, "County");
    var IrishTypesarray = createfilteroptionarray(data.IrishType, "Irish");
    var DEISarray = createfilteroptionarray(data.DEIS, "DEIS");
    var Religionarray = createfilteroptionarray(data.Religion, "Religion");
    var filters = [
		{
		    Type: "select",
		    Name: "County",
		    Options: countyarray,
		    CurrentOption: ko.observable(countyarray[0]).extend({ hashSync: 'County' }),
		    RecordValue: function (record) { return record.County; }
		},
        {
            Type: "select",
            Name: "Irish",
            Options: IrishTypesarray,
            CurrentOption: ko.observable(IrishTypesarray[0]).extend({ hashSync: 'Irish' }),
            RecordValue: function (record) { return record.Irish; }
        },
        {
            Type: "select",
            Name: "DEIS",
            Options: DEISarray,
            CurrentOption: ko.observable(DEISarray[0]).extend({ hashSync: 'DEIS' }),
            RecordValue: function (record) { return record.DEIS; }
        },
         {
             Type: "select",
             Name: "Religion",
             Options: Religionarray,
             CurrentOption: ko.observable(Religionarray[0]).extend({ hashSync: 'Religion' }),
             RecordValue: function (record) { return record.Religion; }
         },
         {
             Type: "text",
             Name: "Search",
             Value: ko.observable("").extend({ hashSync: 'Search' }),
             RecordValue: function (record) {
                 var recordarray = [];
                 recordarray.push(record.Name);
                 recordarray.push(record.Address);
                 return recordarray;
             }
         }
    ];
    var sortOptions = [
        {
            Name: "Name",
            Value: "Name",
            Sort: function (left, right) { return CompareCaseInsensitive(left.Name, right.Name); }
        },
        {
            Name: "County",
            Value: "County",
            Sort: function (left, right) { return CompareCaseInsensitive(left.County, right.County); }
        },
        {
            Name: "Irish",
            Value: "Irish",
            Sort: function (left, right) { return CompareCaseInsensitive(left.Irish, right.Irish); }
        },
        {
            Name: "DEIS",
            Value: "DEIS",
            Sort: function (left, right) { return CompareCaseInsensitive(left.DEIS, right.DEIS); }
        },
        {
            Name: "Religion",
            Value: "Religion",
            Sort: function (left, right) { return CompareCaseInsensitive(left.Religion, right.Religion); }
        },
        {
              Name: "Boys",
              Value: "Boys",
              Sort: function (left, right) { return left.Boys < right.Boys; }
        },
        {
                Name: "Girls",
                Value: "Girls",
                Sort: function (left, right) { return left.Girls < right.Girls; }
        },
        {
            Name: "Total",
            Value: "Total",
            Sort: function (left, right) { return left.Total < right.Total; }
        }

    ];

    self.alertmessage = ko.computed(function () { //maybe change this from a ko computed;
        for (var index = 0; index < filters.length; index++) {
            if (filters[index].Type === "select") {
                filters[index].CurrentOption.subscribe(function (newValue) {
                    var minussearch = filters.length - 1;
                    for (var index2 = 0; index2 < minussearch; index2++) {
                        if (filters[index2].CurrentOption() === newValue && newValue != filters[index2].Options[0]) {
                            document.getElementById('snoAlertBox').innerHTML = "Filtered " + filters[index2].Name + " to " + newValue;
                            showalert();
                        }
                    }
                });
            }
            else if (filters[index].Type === "text") {
                filters[index].Value.subscribe(function (newValue) {
                    if (newValue === "")
                    { document.getElementById('snoAlertBox').innerHTML = "Cleared Searchbar"; showalert(); }
                    else { document.getElementById('snoAlertBox').innerHTML = "Filtered Search to " + newValue; showalert(); }
                });
            }
        }
        return "table filtered";
    });

    self.filter = new FilterModel(filters, self.schoollist);
    self.sorter = new SorterModel(sortOptions, self.filter.filteredRecords);
    self.pager = new PagerModel(self.sorter.orderedRecords);
    self.sortdataclick = function (params) { //try and put this in sortermodel;
        if (params != undefined) {
            run_waitMe();
            if (self.sorter.currentSortOption().Value === params) //remember difference between == and === in js;
            {
                if (self.sorter.currentSortDirection() === self.sorter.sortDirections()[0]) {
                    self.sorter.currentSortDirection(self.sorter.sortDirections()[1]);
                }
                else {
                    self.sorter.currentSortDirection(self.sorter.sortDirections()[0]);
                }
            }
            else {
                var sortoption = currentsortoption(sortOptions, params);
                self.sorter.currentSortOption(sortoption);
            }
        }
    };

    self.columnwidth = function (params) {
        if (params != undefined) {
            if (params === "Name") {
                return 'namecolumn';
            }
            if (params === "DEIS") {
                return 'DEIScolumn';
            }
            if (params === "Religion") {
                return 'Religioncolumn';
            }
        }
        else {
            return '';
        }
    }; //checks all columns and adds a css class to the name column;
    self.SelectedSchool = ko.observable();

    self.showModal = function (school) {
        var rollno = school.RollNo
        var url = "PrimarySchool/Details?rollno=" + rollno;
        window.location.href = url;
        self.SelectedSchool(school);
        $('#SchoolModal').modal();
    }
    self.sorticon = function (column) {
        if (column === self.sorter.currentSortOption().Name) {
            var check = self.sorter.currentSortDirection().Name;
            if (check === "Asc") {
                return 'stickright glyphicon glyphicon glyphicon-triangle-bottom';
            }
            else { return 'stickright glyphicon glyphicon glyphicon-triangle-top'; }
        }
        else { return 'stickright glyphicon glyphicon-glass'; }
    };
}

function PagerModel(results) {
    var self = this;

    self.pageSizeOptions = ko.observableArray([1, 5, 10, 15, 20, 25, 50, 100]);

    self.results = GetObservableArray(results);
    self.currentPageIndex = ko.observable(self.results().length > 0 ? 0 : -1);
    self.currentPageSize = ko.observable(25);
    self.recordCount = ko.computed(function () {
        return self.results().length;
    });
    self.maxPageIndex = ko.computed(function () {
        return Math.ceil(self.results().length / self.currentPageSize()) - 1;
    });
    self.Displayrecordsstring = ko.computed(function () {
        var initialrow = ((self.currentPageIndex() * self.currentPageSize()) + 1);
        if (initialrow > 0) {
            var lastrow = (initialrow - 1) + self.currentPageSize();
            if (lastrow > self.results().length) {
                lastrow = self.results().length;
            }
            var string = initialrow + "-" + lastrow + " of " + self.results().length + " results";

            return string;
        }
        else {
            var string = "0 Results";
            return string;
        }
    });
    self.Displaypagesstring = ko.computed(function () {
        var currentpage = self.currentPageIndex() + 1;
        var maxpage = self.maxPageIndex() + 1;
        if (currentpage > 0) {
            var string = "Page " + currentpage + " of " + maxpage;
            return string;
        }
        else {
            var string = "0 Pages";
            return string;
        }

    });
    self.currentPageRecords = ko.computed(function () {
        var newPageIndex = -1;
        var pageIndex = self.currentPageIndex(); //current index;
        var maxPageIndex = self.maxPageIndex(); //max index;
        if (pageIndex > maxPageIndex) { //if current index is bigger than max index due to filtering
            newPageIndex = 0; //change newindex page to 0 as filtering has occured;

        }
        else if (pageIndex == -1) { //if filtered to where no records left on page and therefore no pages i.e. -1;
            if (maxPageIndex > -1) { //if data left on anypage .. usually due to coming back from a no records situation
                newPageIndex = 0;  //set newindex page to 0;
            }
            else {
                newPageIndex = -2; //make sure its not = to pageindex i.e. no records
            }
        }
        else { //otherwise pageindex and newpageindex are the same;
            newPageIndex = pageIndex;
        }

        if (newPageIndex != pageIndex) { //if not the same ... no records and set page to 0 so its not in minus to prevent page from breaking;
            if (newPageIndex >= -1) { //i.e. minimun value a pageindex has to be 0;
                self.currentPageIndex(newPageIndex);
            }
            return [];
        }

        var pageSize = self.currentPageSize(); //get the results based off current page and page size;
        var startIndex = pageIndex * pageSize;
        var endIndex = startIndex + pageSize;
        $('#SchoolTable').waitMe('hide');
        return self.results().slice(startIndex, endIndex);
    }).extend({ throttle: 5 });
    self.moveFirst = function () {
        self.changePageIndex(0);
    };
    self.movePrevious = function () {
        self.changePageIndex(self.currentPageIndex() - 1);
    };
    self.moveNext = function () {
        self.changePageIndex(self.currentPageIndex() + 1);
    };
    self.moveLast = function () {
        self.changePageIndex(self.maxPageIndex());
    };
    self.changePageIndex = function (newIndex) {
        run_waitMe();
        if (newIndex < 0
            || newIndex == self.currentPageIndex()
            || newIndex > self.maxPageIndex()) {
            return;
        }

        self.currentPageIndex(newIndex);
    };
    self.onPageSizeChange = function () {
        run_waitMe();
        self.currentPageIndex(0);
    }; //returns back to main page after filtering data;
    self.PagesCount = ko.dependentObservable(function () {
        var pages = [];
        for (i = 0; i <= self.maxPageIndex() ; i++) {
            pages.push({ pageNumber: (i + 1) });
        }
        return pages;
    });
    self.showPages = function (PageCount) { //displays the visible page numbers at paginations below the table;
        var pagenumber = PageCount.pageNumber;
        var currentPage = self.currentPageIndex() + 1;
        if (currentPage <= 3) {
            if (pagenumber <= 5)
            { return true; }
            else { return false; }
        }
        if ((currentPage + 2) >= pagenumber && currentPage <= pagenumber) {
            return true;
        }
        else if ((currentPage - 3) < pagenumber && currentPage > pagenumber) {
            return true;
        }
        else { return false; }
        if (currentPage === maxPageIndex()) {
            if (pagenumber < (maxPageIndex() - 10)) {
                return false;
            }
            else { return true; }
        }
    };

}

function SorterModel(sortOptions, records) {
    var self = this;
    self.records = GetObservableArray(records);
    self.sortOptions = ko.observableArray(sortOptions);
    self.sortDirections = ko.observableArray([
        {
            Name: "Asc",
            Sort: false
        },
        {
            Name: "Desc",
            Sort: true
        }]);
    self.currentSortOption = ko.observable(self.sortOptions()[0]);
    self.currentSortDirection = ko.observable(self.sortDirections()[0]);

    self.orderedRecords = ko.computed(function () {
        var records = self.records();
        var sortOption = self.currentSortOption();
        var sortDirection = self.currentSortDirection();

        if (sortOption == null || sortDirection == null) {
            return records;
        }

        var sortedRecords = records.slice(0, records.length);
        //SortArray(sortedRecords, sortDirection.Sort, sortOption.Sort);
        return sortedRecords;
    }).extend({ throttle: 5 });
}

function FilterModel(filters, records) {
    var self = this;

    self.records = GetObservableArray(records);
    self.filters = ko.observableArray(filters);

    self.clearfilters = function () {
        run_waitMe();
        var filters = self.filters();
        var check = self.activeFilters();
        if (check.length !== 0) {
            for (var i = 0; i < filters.length; i++) {
                if (filters[i].CurrentOption) {
                    filters[i].CurrentOption(filters[i].Options[0]);
                }
                else {
                    filters[i].Value('');
                }
            }
        }
    }
    self.activeFilters = ko.computed(function () {

        var filters = self.filters();
        var activeFilters = [];
        for (var index = 0; index < filters.length; index++) {
            var filter = filters[index];
            if (filter.CurrentOption) {
                var filterOption = filter.CurrentOption();
                var filtercheck = "Select " + filter.Name;
                if (filterOption && filterOption !== filtercheck) {
                    var activeFilter = {
                        Filter: filter,
                        IsFiltered: function (filter, record) {
                            var filterOption = filter.CurrentOption();
                            if (!filterOption) {
                                return;
                            }
                            var recordValue = filter.RecordValue(record);
                            return recordValue != filterOption;
                        }
                    };

                    activeFilters.push(activeFilter);
                }
            }
            else if (filter.Value) {
                var filterValue = filter.Value();
                if (filterValue && filterValue != "") {
                    var sdf = ko.observable(filterValue) //is this line needed
                    var activeFilter = {
                        Filter: filter,
                        IsFiltered: function (filter, record) {
                            var filterValue = filter.Value();
                            filterValue = filterValue.toUpperCase();

                            var recordValuearray = filter.RecordValue(record);
                            for (var i = 0; i < recordValuearray.length; i++) {
                                var recordValue = recordValuearray[i];
                                recordValue = recordValue.toUpperCase();
                                if (recordValue.indexOf(filterValue) != -1) {
                                    return false;
                                }
                                //return recordValue.indexOf(filterValue) == -1;
                            }
                            return true;

                        }
                    };
                    activeFilters.push(activeFilter);
                }
            }
        }
        return activeFilters;
    });
    self.filteredRecords = ko.computed(function () {
        var records = self.records();
        var filters = self.activeFilters();
        if (filters.length == 0) { //no need to filter if empty;
            return records;
        }

        var filteredRecords = [];
        for (var rIndex = 0; rIndex < records.length; rIndex++) {
            var isIncluded = true;
            var record = records[rIndex];
            for (var fIndex = 0; fIndex < filters.length; fIndex++) {
                var filter = filters[fIndex];
                var isFiltered = filter.IsFiltered(filter.Filter, record);
                if (isFiltered) {
                    isIncluded = false;
                    break;
                }
            }

            if (isIncluded) {
                filteredRecords.push(record);
            }
        }
        return filteredRecords;
    }).extend({ throttle: 200 });

}

function ExtractModels(parent, data, constructor) {
    var models = [];
    if (data == null) {
        return models;
    }

    for (var index = 0; index < data.length; index++) {
        var row = data[index];
        var model = new constructor(row, parent);
        models.push(model);
    }

    return models;
}

function GetObservableArray(array) { //turns js array into ko observable, returns if already a function i.e. observable;
    if (typeof (array) == 'function') {
        return array;
    }

    return ko.observableArray(array);
}

function CompareCaseInsensitive(left, right) {
    if (left == null) {
        return right == null;
    }
    else if (right == null) {
        return false;
    }
    var lefthigher = left.toUpperCase(); var righthigher = right.toUpperCase();
    var result = lefthigher.localeCompare(righthigher);
    return (result >= 0) ? false : true;

}

function SortArray(array, direction, comparison) {
    if (array == null) {
        return [];
    }

    for (var oIndex = 0; oIndex < array.length; oIndex++) {
        var oItem = array[oIndex];//1st item in array;
        for (var iIndex = oIndex + 1; iIndex < array.length; iIndex++) {
            var iItem = array[iIndex];//next item in array after oitem;
            var isOrdered = comparison(oItem, iItem);
            if (isOrdered == direction) {
                array[iIndex] = oItem;
                array[oIndex] = iItem;
                oItem = iItem;
            }
        }
    }
    return array;
}

function createfilteroptionarray(filteroptions, filtertype) {
    var array = [];
    var initialtxt = "Select " + filtertype;
    array.push(initialtxt);
    for (count = 0; count < filteroptions.length; count++) {
        array.push(filteroptions[count]);
    }
    return array;
}

function currentsortoption(sortoptions, param) { //gets list  of options and return if its = to option;
    for (var i = 0; i < sortoptions.length; i++) {
        if (sortoptions[i].Name === param) {
            return sortoptions[i];
        }
    }
}

function run_waitMe() {
    $('#SchoolTable').waitMe({
        //none, rotateplane, stretch, orbit, roundBounce, win8,
        //win8_linear, ios, facebook, rotation, timer, pulse,
        //progressBar, bouncePulse or img
        effect: 'pulse',
        //place text under the effect (string).
        text: 'Loading Data',
        //background for container (string).
        bg: 'rgba(255,255,255,0.7)',
        //color for background animation and text (string).
        color: '#000',
        //change width for elem animation (string).
        sizeW: '20',
        //change height for elem animation (string).
        sizeH: '40',
    });
}

function showalert() {
    $("#snoAlertBox").fadeIn();
    closeSnoAlertBox();
};

function closeSnoAlertBox() {
    window.setTimeout(function () {
        $("#snoAlertBox").fadeOut(300)
    }, 3000);
}
