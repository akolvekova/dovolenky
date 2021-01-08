import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { Workbook, FormulaType, Worksheet, CellValue, Column } from 'exceljs';
import { Zaznam } from '../data-model/zaznam';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExcelExportService {

    jsonLength = 0;
    constructor() { }

    exportAsExcelFile(json: Zaznam[], excelFileName: string): void {
        this.jsonLength = json.length;
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet('Stav dovoleniek');

        worksheet.columns = [
            { header: 'Meno', key: 'meno', width: 32 },
            { header: 'Zostatok z 2019', key: 'stara', width: 15 },
            { header: 'Nárok v 2020', key: 'nova', width: 15 },
            { header: 'I.', key: 'mesiac01', width: 5 },
            { header: 'II.', key: 'mesiac02', width: 5 },
            { header: 'III.', key: 'mesiac03', width: 5 },
            { header: 'IV.', key: 'mesiac04', width: 5 },
            { header: 'V.', key: 'mesiac05', width: 5 },
            { header: 'VI.', key: 'mesiac06', width: 5 },
            { header: 'VII.', key: 'mesiac07', width: 5 },
            { header: 'VIII.', key: 'mesiac08', width: 5 },
            { header: 'IX.', key: 'mesiac09', width: 5 },
            { header: 'X.', key: 'mesiac10', width: 5 },
            { header: 'XI.', key: 'mesiac11', width: 5 },
            { header: 'XII.', key: 'mesiac12', width: 5 },
            { header: 'Zostatok', key: 'zostatok', width: 12 }
        ];

        json.forEach(e => {
            worksheet.addRow({
                meno: e.pouzivatel.priezvisko + ' ' + e.pouzivatel.meno,
                stara: e.pouzivatel.predchadzajuca,
                nova: e.pouzivatel.narok,
                mesiac01: (new Date()).getMonth() + 1 >= 1 ? e.mesiac01 : '',
                mesiac02: (new Date()).getMonth() + 1 >= 2 ? e.mesiac02 : '',
                mesiac03: (new Date()).getMonth() + 1 >= 3 ? e.mesiac03 : '',
                mesiac04: (new Date()).getMonth() + 1 >= 4 ? e.mesiac04 : '',
                mesiac05: (new Date()).getMonth() + 1 >= 5 ? e.mesiac05 : '',
                mesiac06: (new Date()).getMonth() + 1 >= 6 ? e.mesiac06 : '',
                mesiac07: (new Date()).getMonth() + 1 >= 7 ? e.mesiac07 : '',
                mesiac08: (new Date()).getMonth() + 1 >= 8 ? e.mesiac08 : '',
                mesiac09: (new Date()).getMonth() + 1 >= 9 ? e.mesiac09 : '',
                mesiac10: (new Date()).getMonth() + 1 >= 10 ? e.mesiac10 : '',
                mesiac11: (new Date()).getMonth() + 1 >= 11 ? e.mesiac11 : '',
                mesiac12: (new Date()).getMonth() + 1 >= 12 ? e.mesiac12 : '',
                zostatok: e.zostatok
            }, 'n');
        });

        worksheet.addRow({
            meno: 'Sumár',
            stara: { formula: 'SUM(B2:B' + (this.jsonLength + 1) + ')', result: this.sumCol(worksheet.getColumn('B')) },
            nova: { formula: 'SUM(C2:C' + (this.jsonLength + 1) + ')', result: this.sumCol(worksheet.getColumn('C')) },
            mesiac01: (new Date()).getMonth() + 1 >= 1
                ? { formula: 'SUM(D2:D' + (this.jsonLength + 1) + ')', result: this.sumCol(worksheet.getColumn('D')) } : '',
            mesiac02: (new Date()).getMonth() + 1 >= 2
                ? { formula: 'SUM(E2:E' + (this.jsonLength + 1) + ')', result: this.sumCol(worksheet.getColumn('E')) } : '',
            mesiac03: (new Date()).getMonth() + 1 >= 3
                ? { formula: 'SUM(F2:F' + (this.jsonLength + 1) + ')', result: this.sumCol(worksheet.getColumn('F')) } : '',
            mesiac04: (new Date()).getMonth() + 1 >= 4
                ? { formula: 'SUM(G2:G' + (this.jsonLength + 1) + ')', result: this.sumCol(worksheet.getColumn('G')) } : '',
            mesiac05: (new Date()).getMonth() + 1 >= 5
                ? { formula: 'SUM(H2:H' + (this.jsonLength + 1) + ')', result: this.sumCol(worksheet.getColumn('H')) } : '',
            mesiac06: (new Date()).getMonth() + 1 >= 6
                ? { formula: 'SUM(I2:I' + (this.jsonLength + 1) + ')', result: this.sumCol(worksheet.getColumn('I')) } : '',
            mesiac07: (new Date()).getMonth() + 1 >= 7
                ? { formula: 'SUM(J2:J' + (this.jsonLength + 1) + ')', result: this.sumCol(worksheet.getColumn('J')) } : '',
            mesiac08: (new Date()).getMonth() + 1 >= 8
                ? { formula: 'SUM(K2:K' + (this.jsonLength + 1) + ')', result: this.sumCol(worksheet.getColumn('K')) } : '',
            mesiac09: (new Date()).getMonth() + 1 >= 9
                ? { formula: 'SUM(L2:L' + (this.jsonLength + 1) + ')', result: this.sumCol(worksheet.getColumn('L')) } : '',
            mesiac10: (new Date()).getMonth() + 1 >= 10
                ? { formula: 'SUM(M2:M' + (this.jsonLength + 1) + ')', result: this.sumCol(worksheet.getColumn('M')) } : '',
            mesiac11: (new Date()).getMonth() + 1 >= 11
                ? { formula: 'SUM(N2:N' + (this.jsonLength + 1) + ')', result: this.sumCol(worksheet.getColumn('N')) } : '',
            mesiac12: (new Date()).getMonth() + 1 === 12
                ? { formula: 'SUM(O2:O' + (this.jsonLength + 1) + ')', result: this.sumCol(worksheet.getColumn('O')) } : '',
            zostatok: { formula: 'SUM(P2:P' + (this.jsonLength + 1) + ')', result: this.sumCol(worksheet.getColumn('P')) }
        }, 'n');

        worksheet.eachRow(row => {
            row.eachCell({ includeEmpty: false }, cell => {
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
            });
        });

        worksheet.getRow(1).eachCell({ includeEmpty: false }, cell => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '0e5c7e' }
            };
            cell.font = {
                color: { argb: 'ffffff' },
                bold: true
            };
        });

        worksheet.getRow(this.jsonLength + 2).eachCell({ includeEmpty: false }, cell => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '3dc4d2' }
            };
            cell.font = {
                color: { argb: 'ffffff' },
                bold: true
            };
        });

        workbook.calcProperties.fullCalcOnLoad = true;

        workbook.xlsx.writeBuffer().then((data) => {
            const blob = new Blob([data], { type: EXCEL_TYPE });
            FileSaver.saveAs(blob, excelFileName + (new Date()).getFullYear() + EXCEL_EXTENSION);
        });
    }


    sumCol(column: Partial<Column>): number {
        let sum = 0;
        column.eachCell((cell, rowNumber) => {
            if (rowNumber >= 2 && rowNumber <= (this.jsonLength + 1)) {
                sum = sum + +cell;
            }
        });
        return sum;
    }

}
