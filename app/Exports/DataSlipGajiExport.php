<?php

namespace App\Exports;

use App\Models\Employe;
use App\Models\User;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithCustomStartCell;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\FromCollection;

class DataSlipGajiExport implements FromCollection, WithHeadings, WithMapping, WithEvents, WithCustomStartCell
{
    /**
    * @return \Illuminate\Support\Collection
    * 
    */

    use Exportable;
    protected $data;
    protected $orderBy;

    public function forData($data)
    {
        $this->data = $data instanceof Collection ? $data : collect($data);
        return $this;
    }
    
    public function forOrder($orderBy)
    {
        $this->orderBy = $orderBy;
        return $this;
    }

    public function collection()
    {
        return $this->data
               ->sortBy(
                    fn($item) => $item->employe->numbers ?? 0,
                )->sortBy(
                    fn($item) => $item->employe->date_real ?? null,
                )->sortBy(
                    fn($item) => $item->formasi,
                );
    }

     public function map($user): array
    {
        return [
            'bulan_tahun' => $user->bulan_tahun,
            'nama_lengkap' => $user->karyawan,
            'formasi' => $user->user->divisi->name,
            'mk' => $user->mk,
            'pokok' => $user->gaji_pokok,
            'lembur' => $user->gaji_lembur,
            'jabatan' => $user->tj_jabatan,
            'kehadiran' => $user->tj_kehadiran,
            'kinerja' => $user->tj_kinerja,
            'tj_lain' => $user->tj_lain,
            'bpjs' => $user->bpjs,
            'pinjaman' => $user->pinjaman,
            'absen' => $user->absen,
            'lain_lain' => $user->lain_lain,
            'total' => $user->total,
        ];
    }


    public function headings(): array
    {
        return [
            'bulan_tahun',
            'karyawan',
            'formasi',
            'mk',
            'pokok',
            'lembur',
            'jabatan',
            'kehadiran',
            'kinerja',
            'tj_lain',
            'bpjs',
            'pinjaman',
            'absen',
            'lain_lain',
            'total',
        ];
    }

    public function startCell(): string
    {
        return 'A2';
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function(AfterSheet $event) {
                $sheet = $event->sheet->getDelegate();
                $sheet->mergeCells('B1:D1');

                $sheet->mergeCells('E1:F1');

                $sheet->mergeCells('G1:J1');

                $sheet->mergeCells('K1:N1');

                $sheet->setCellValue('B1', 'Data Karyawan');
                $sheet->setCellValue('E1', 'Gaji');
                $sheet->setCellValue('G1', 'Tunjangan');
                $sheet->setCellValue('K1', 'Potongan');

                // Set styles for the headers
                $sheet->getStyle('A1:M1')->applyFromArray([
                    'font' => [
                        'bold' => true,
                        'size' => 14,
                    ],
                    'alignment' => [
                        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                        'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
                    ],
                ]);
            }
        ];
    }
}
