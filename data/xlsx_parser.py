import xlrd
import pprint
import json

book = 'sampleData.xlsx'

def parseSheet(sheet):
    log = {}
    data = []
    keys = sheet.row_values(0)
    for row in range(1, sheet.nrows):
        item = {}
        if(not sheet.row_values(row)[0]):
            continue
        else:
            for index in range(len(keys)):
                item[keys[index]] = sheet.row_values(row)[index]
            data.append(item)
    log[sheet.name] = data  
    return log

def parseWorkbook(path):
    data = []
    workbook = xlrd.open_workbook(path)
    for sheet in workbook.sheet_names():
        if workbook.sheet_by_name(sheet).nrows:
            data.append(parseSheet(workbook.sheet_by_name(sheet)))
    return data

pprint.pprint(parseWorkbook(book))
with open('data.json', 'w') as outfile:
    json.dump(parseWorkbook(book), outfile, sort_keys = True, indent = 4,
               ensure_ascii = False)
