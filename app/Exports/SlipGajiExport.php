<?php

namespace App\Exports;

use App\Models\Employe;
use App\Models\User;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithCustomStartCell;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\FromCollection;

class SlipGajiExport implements FromCollection, WithHeadings, WithMapping, WithEvents, WithCustomStartCell
{
    /**
    * @return \Illuminate\Support\Collection
    * 
    */

    use Exportable;
    protected $kerjasama_id;
    protected $devisi;
    protected $orderBy;
    protected $pluck;
    protected $notpluck;
    protected $dev_user;
    protected $with_user;

    public function forKerjasama(string $kerjasama_id)
    {
        $this->kerjasama_id = $kerjasama_id;
        return $this;
    }

    public function forWith($devisi)
    {
        $this->devisi = $devisi;
        return $this;
    }

    public function forWithUser($with_user)
    {
        $this->with_user = $with_user;
        return $this;
    }

    public function forDevUser($dev_user)
    {
        $this->dev_user = $dev_user;
        return $this;
    }

    public function forOrder($orderBy)
    {
        $this->orderBy = $orderBy;
        return $this;
    }

     public function withAdditionalParams($bulan)
    {
        $this->bulan = $bulan;
        return $this;
    }

    public function forWhereIn(array $pluck)
    {
        $this->pluck = $pluck;
        return $this;
    }

    public function forWhereNotIn(array $notpluck)
    {
        $this->notpluck = $notpluck;
        return $this;
    }

    // $employe->with(['user', 'user.divisi'])->where('client_id', $client->id)
    //                 ->whereIn('name', $user->pluck('nama_lengkap')->toArray())
    //                 ->orderBy("numbers", 'asc')
    //                 ->orderBy("date_real", 'asc')
    //                 ->whereNotIn('name', $slip->pluck('karyawan')->toArray())
    //                 ->get();
    public function collection()
    {
        return Employe::with([$this->with_user, $this->dev_user])
                ->where('client_id', $this->kerjasama_id)
                ->whereIn('name', $this->pluck)
                ->orderBy('numbers', $this->orderBy)
                ->orderBy('date_real', $this->orderBy)
                ->whereNotIn('name', $this->notpluck)
                ->get();
        // return User::on('mysql2connection')
        //     ->with($this->devisi)
        //     ->where('kerjasama_id', $this->kerjasama_id)
        //     ->orderBy('devisi_id', $this->orderBy)
        //     ->orderBy('nama_lengkap', $this->orderBy)
        //     ->whereIn('nama_lengkap', $this->pluck)
        //     ->whereNotIn('id', $this->notpluck)
        //     ->get();
    }

     public function map($user): array
    {
        // echo $user;
        return [
            'bulan_tahun' => $this->bulan,
            'nama_lengkap' => $user->name,
            'formasi' => $user->user->divisi->name
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
