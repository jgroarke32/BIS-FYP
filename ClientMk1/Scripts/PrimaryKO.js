function CustomerModel(data) {
    if (!data) {
        data = {};
    }

    var self = this;
    self.OfficialSchoolName = data.OfficialSchoolName.capitalizeFirstLetter();
    self.Address1 = data.Address1;
    self.Address2 = data.Address2;
    self.Address3 = data.Address3;
    self.Address4 = data.Address4;
    self.County = data.County;
    self.SchoolGender = data.SchoolGender;
    self.IrishClassification = data.IrishClassification;
    self.FeePaying = data.FeePaying;
    self.Religion = data.Religion;
    self.TotalEnrolments = data.TotalEnrolments;
    self.DEIS = data.DEIS;
    self.TotalBoys = data.TotalBoys,
    self.TotalGirls = data.TotalGirls,
    self.TotalPupils = data.TotalPupils
}

function CustomerPageModel(data) {
    if (!data) {
        data = {};
    }
    console.log("Version15.03");
    var self = this;
    self.customers = ExtractModels(self, data.Schools, CustomerModel);
    self.countyoptions = data.countyfilteroptions;
    self.genders = data.Genders;
    self.IrishTypes = data.IrishType;
    self.Fees = data.FeePaying;
    self.Religion = data.Religion;
    self.params = data.SencondLevelSchoolcols;
    var currentSchool = ko.observable(self.customers[0]);
    var countyarray = createcountyarray(self.countyoptions, "County");
    var gendersarray = createcountyarray(self.genders, "Gender");
    var IrishTypesarray = createcountyarray(self.IrishTypes, "Irish");
    var Feesarray = createcountyarray(self.Fees, "Fees");
    var Religionarray = createcountyarray(self.Religion, "Religion");
    var filters = [
		//{
		//    Type: "text",
		//    Name: "OfficialSchoolName",
		//    Value: ko.observable(""),
		//    RecordValue: function (record) { return record.OfficialSchoolName; }
		//},
		{
		    Type: "select",
		    Name: "County",
		    Options: countyarray,
		    CurrentOption: ko.observable(),
		    RecordValue: function (record) { return record.County; }
		},
        {
            Type: "select",
            Name: "SchoolGender",
            Options: gendersarray,
            CurrentOption: ko.observable(),
            RecordValue: function (record) { return record.SchoolGender; }
        },
        {
            Type: "select",
            Name: "IrishClassification",
            Options: IrishTypesarray,
            CurrentOption: ko.observable("Select Irish Type"),
            RecordValue: function (record) { return record.IrishClassification; }
        },
        {
            Type: "select",
            Name: "FeePaying",
            Options: Feesarray,
            CurrentOption: ko.observable("Select Fees"),
            RecordValue: function (record) { return record.FeePaying; }
        },
         {
             Type: "select",
             Name: "Religion",
             Options: Religionarray,
             CurrentOption: ko.observable("Select Religion"),
             RecordValue: function (record) { return record.Religion; }
         },
         {
             Type: "text",
             Name: "OfficialSchoolName",
             Value: ko.observable(""),
             RecordValue: function (record) { return record.OfficialSchoolName; }
         }
    ];
    var sortOptions = [
		//{
		//    Name: "ID",
		//    Value: "ID",
		//    Sort: function (left, right) { return left.id < right.id; }
		//},
        {
            Name: "OfficialSchoolName",
            Value: "OfficialSchoolName",
            Sort: function (left, right) { return CompareCaseInsensitive(left.OfficialSchoolName, right.OfficialSchoolName); }
        },
        {
            Name: "County",
            Value: "County",
            Sort: function (left, right) { return CompareCaseInsensitive(left.County, right.County); }
        },
        {
            Name: "SchoolGender",
            Value: "SchoolGender",
            Sort: function (left, right) { return CompareCaseInsensitive(left.SchoolGender, right.SchoolGender); }
        },
        {
            Name: "IrishClassification",
            Value: "IrishClassification",
            Sort: function (left, right) { return CompareCaseInsensitive(left.IrishClassification, right.IrishClassification); }
        },
        {
            Name: "FeePaying",
            Value: "FeePaying",
            Sort: function (left, right) { return CompareCaseInsensitive(left.FeePaying, right.FeePaying); }
        },
        {
            Name: "Religion",
            Value: "Religion",
            Sort: function (left, right) { return CompareCaseInsensitive(left.Religion, right.Religion); }
        },
        {
            Name: "TotalEnrolments",
            Value: "TotalEnrolments",
            Sort: function (left, right) { return CompareCaseInsensitive(left.CoTotalEnrolmentsunty < right.TotalEnrolments); }
        }

    ];
    self.filter = new FilterModel(filters, self.customers);
    self.sorter = new SorterModel(sortOptions, self.filter.filteredRecords);
    self.pager = new PagerModel(self.sorter.orderedRecords);
    self.sortdataclick = function (params) { //try and put this in sortermodel;
        if (params != undefined) {
            console.log(self.sorter.currentSortOption());
            if (self.sorter.currentSortOption().Value === params) //remember difference between == and === in js;
            {
                if (self.sorter.currentSortDirection() === self.sorter.sortDirections()[0]) {
                    self.sorter.currentSortDirection(self.sorter.sortDirections()[1]);
                    run_waitMe();
                }
                else {
                    self.sorter.currentSortDirection(self.sorter.sortDirections()[0]);
                    run_waitMe();
                }
            }
            else {
                var sortoption = currentsortoption(sortOptions, params);
                run_waitMe();
                //self.sorter.currentsortoption(params);
                self.sorter.currentSortOption(sortoption);
            }
        }
    };
    self.displayAdvancedOptions = ko.observable(false);
    self.SelectedSchool = ko.observable();
    self.searchValue = ko.observable();
    self.searchValue.subscribe(function (newValue) {
        // alert("The value is " + newValue);

        var $rows = $('#SchoolTable tr');
        var val = $.trim($(newValue).val()).replace(/ +/g, ' ').toLowerCase();

        self.filter.filteredRecords.filter(function () {
            var self = this;
            var text = $(self).text().replace(/\s+/g, ' ').toLowerCase();
            return !~text.indexOf(val);
        }).hide();
    });
    self.showModal = function (school) {
        self.SelectedSchool(school);
        console.log(self.SelectedSchool());
        $('#SchoolModal').modal();
    }
    self.sorticon = function (column) {
        if (column === self.sorter.currentSortOption().Name) {
            var check = self.sorter.currentSortDirection().Name;
            if (check === "Asc") {
                return 'stickright glyphicon glyphicon-sort-by-alphabet';
            }
            else { return 'stickright glyphicon glyphicon-sort-by-alphabet-alt'; }
        }
        else { return ''; }
    };
}


function PagerModel(records) {
    var self = this;

    self.pageSizeOptions = ko.observableArray([1, 5, 25, 50, 100, 250, 500]);

    self.records = GetObservableArray(records);
    self.currentPageIndex = ko.observable(self.records().length > 0 ? 0 : -1);
    self.currentPageSize = ko.observable(25);
    self.recordCount = ko.computed(function () {
        return self.records().length;
    });
    self.maxPageIndex = ko.computed(function () {
        return Math.ceil(self.records().length / self.currentPageSize()) - 1;
    });
    self.Displayrecordsstring = ko.computed(function () {
        var initialrow = ((self.currentPageIndex() * self.currentPageSize()) + 1);
        var lastrow = (initialrow - 1) + self.currentPageSize();
        if (lastrow > self.records().length) {
            lastrow = self.records().length;
        }
        var string = "Displaying " + initialrow + "-" + lastrow + " of " + self.records().length + " results";
        return string;
    });
    self.Displaypagesstring = ko.computed(function () {
        var currentpage = self.currentPageIndex() + 1;
        var maxpage = self.maxPageIndex() + 1;
        var string = "Page " + currentpage + " of " + maxpage;
        return string;
    });
    self.currentPageRecords = ko.computed(function () {
        var newPageIndex = -1;
        var pageIndex = self.currentPageIndex();
        var maxPageIndex = self.maxPageIndex();
        if (pageIndex > maxPageIndex) {
            newPageIndex = maxPageIndex;
        }
        else if (pageIndex == -1) {
            if (maxPageIndex > -1) {
                newPageIndex = 0;
            }
            else {
                newPageIndex = -2;
            }
        }
        else {
            newPageIndex = pageIndex;
        }

        if (newPageIndex != pageIndex) {
            if (newPageIndex >= -1) {
                self.currentPageIndex(newPageIndex);
            }

            return [];
        }

        var pageSize = self.currentPageSize();
        var startIndex = pageIndex * pageSize;
        var endIndex = startIndex + pageSize;
        console.log("Finished");
        $('#SchoolTable').waitMe('hide');
        document.getElementById("SchoolTable").style.display = "block";
        return self.records().slice(startIndex, endIndex);
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
        if (newIndex < 0
            || newIndex == self.currentPageIndex()
            || newIndex > self.maxPageIndex()) {
            return;
        }

        self.currentPageIndex(newIndex);
    };
    self.onPageSizeChange = function () {
        self.currentPageIndex(0);
    };
    self.PagesCount = ko.dependentObservable(function () {
        var pages = [];
        for (i = 0; i <= self.maxPageIndex() ; i++) {
            pages.push({ pageNumber: (i + 1) });
        }
        return pages;
    });
    self.showPages = function (PageCount) {
        var pagenumber = PageCount.pageNumber;
        var currentPage = self.currentPageIndex();
        if (self.currentPageIndex() === 0) {
            if (pagenumber <= 10)
            { return true; }
            else { return false; }
        }
        if ((currentPage + 5) >= pagenumber && currentPage <= pagenumber) {
            return true;
        }
        else if ((currentPage - 4) < pagenumber && currentPage > pagenumber) {
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
            Value: "Asc",
            Sort: false
        },
        {
            Name: "Desc",
            Value: "Desc",
            Sort: true
        }]);
    self.currentSortOption = ko.observable(self.sortOptions()[0]);
    self.currentSortDirection = ko.observable(self.sortDirections()[0]);

    self.orderedRecords = ko.computed(function () {
        console.log("Loading...");
        var records = self.records();
        var sortOption = self.currentSortOption();
        var sortDirection = self.currentSortDirection();

        if (sortOption == null || sortDirection == null) {
            return records;
        }

        var sortedRecords = records.slice(0, records.length);
        SortArray(sortedRecords, sortDirection.Sort, sortOption.Sort);
        return sortedRecords;
    }).extend({ throttle: 5 });
}

function FilterModel(filters, records) {
    var self = this;
    self.records = GetObservableArray(records);
    self.filters = ko.observableArray(filters);
    self.activeFilters = ko.computed(function () {
        var filters = self.filters();
        var activeFilters = [];
        for (var index = 0; index < filters.length; index++) {
            var filter = filters[index];
            if (filter.CurrentOption) {
                var filterOption = filter.CurrentOption();
                if (filterOption && filterOption.FilterValue != null) {
                    var activeFilter = {
                        Filter: filter,
                        IsFiltered: function (filter, record) {
                            var filterOption = filter.CurrentOption();
                            if (!filterOption) {
                                return;
                            }

                            var recordValue = filter.RecordValue(record);
                            return recordValue != filterOption.FilterValue;
                        }
                    };
                    activeFilters.push(activeFilter);
                }
            }
            else if (filter.Value) {
                var filterValue = filter.Value();
                if (filterValue && filterValue != "") {
                    var activeFilter = {
                        Filter: filter,
                        IsFiltered: function (filter, record) {
                            var filterValue = filter.Value();
                            filterValue = filterValue.toUpperCase();

                            var recordValue = filter.RecordValue(record);
                            recordValue = recordValue.toUpperCase();
                            return recordValue.indexOf(filterValue) == -1;
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
        if (filters.length == 0) {
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

function GetObservableArray(array) {
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

function GetOption(name, value, filterValue) {
    var option = {
        Name: name,
        Value: value,
        FilterValue: filterValue
    };
    return option;
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

function createcountyarray(countyoptions, filtertype) {
    var array = [];
    var initialtxt = "Select " + filtertype;
    array.push(GetOption(initialtxt, "All", null));
    for (count = 0; count < countyoptions.length; count++) {
        array.push(GetOption(countyoptions[count], countyoptions[count], countyoptions[count]));
    }
    return array;
}

String.prototype.capitalizeFirstLetter = function () {
    var loweredstring = this.toLowerCase();
    var stringarray = loweredstring.split(" ");
    var returnstring = "";
    for (var i = 0; i < stringarray.length; i++) {
        returnstring += " " + stringarray[i].charAt(0).toUpperCase() + stringarray[i].slice(1);
    }
    return returnstring;
}

function currentsortoption(sortoptions, param) {
    for (var i = 0; i < sortoptions.length; i++) {
        if (sortoptions[i].Name === param) {
            return sortoptions[i];
        }
    }
}

// Here's a custom Knockout binding that makes elements shown/hidden via jQuery's fadeIn()/fadeOut() methods
// Could be stored in a separate utility library
ko.bindingHandlers.fadeVisible = {
    init: function (element, valueAccessor) {
        // Initially set the element to be instantly visible/hidden depending on the value
        var value = valueAccessor();
        $(element).toggle(ko.unwrap(value)); // Use "unwrapObservable" so we can handle values that may or may not be observable
    },
    update: function (element, valueAccessor) {
        // Whenever the value subsequently changes, slowly fade the element in or out
        var value = valueAccessor();
        ko.unwrap(value) ? $(element).fadeIn() : $(element).fadeOut();
    }
};

function run_waitMe() {
    $('#SchoolTable').waitMe({
        //none, rotateplane, stretch, orbit, roundBounce, win8,
        //win8_linear, ios, facebook, rotation, timer, pulse,
        //progressBar, bouncePulse or img
        effect: 'ios',
        //place text under the effect (string).
        text: 'Loading Data',
        //background for container (string).
        bg: 'rgba(255,255,255,0.7)',
        //color for background animation and text (string).
        color: '#000',
        //change width for elem animation (string).
        sizeW: '20',
        //change height for elem animation (string).
        sizeH: '50',
    });
}

