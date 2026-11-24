export function exportToCsv(
  filename: string,
  headers: string[],
  rows: (string | number | null | undefined)[][],
) {
  const escapeCsv = (val: any) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const csvContent = [
    headers.map(escapeCsv).join(','),
    ...rows.map((row) => row.map(escapeCsv).join(',')),
  ].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename.endsWith('.csv') ? filename : `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportSubmissionsToCsv(submissions: any[]) {
  const headers = [
    'Reference ID',
    'Submission Date',
    'Project Code',
    'Project Name',
    'Start Chainage',
    'End Chainage',
    'Activities Performed',
    'Supervisor Name',
    'Latitude',
    'Longitude',
    'GPS Accuracy (m)',
    'Remarks',
    'Photos Attached',
    'Status',
  ];

  const rows = submissions.map((s, idx) => [
    s.id ? `#REP-${s.id.slice(0, 8).toUpperCase()}` : `#REP-${88400 + idx}`,
    new Date(s.submittedAt || s.createdAt).toLocaleString(),
    s.project?.projectCode || '',
    s.project?.name || '',
    s.startChainage,
    s.endChainage,
    (s.activities || []).map((a: any) => a.activity?.name || a.name).filter(Boolean).join('; '),
    s.supervisor?.user?.fullName || s.supervisor?.user?.username || 'Field Supervisor',
    s.latitude,
    s.longitude,
    s.locationAccuracyM ?? '',
    s.remarks || '',
    (s.photos || []).length,
    'VERIFIED',
  ]);

  exportToCsv(
    `CivilERP_Daily_Submissions_${new Date().toISOString().slice(0, 10)}.csv`,
    headers,
    rows,
  );
}

export function exportAttendanceToCsv(attendance: any[]) {
  const headers = [
    'Employee Name',
    'Terminal Username',
    'Project Name',
    'Check-in Timestamp',
    'Check-in GPS',
    'Check-out Timestamp',
    'Check-out GPS',
    'Duration (Hours)',
    'Status',
  ];

  const rows = attendance.map((a) => {
    const inTime = new Date(a.checkInAt);
    const outTime = a.checkOutAt ? new Date(a.checkOutAt) : null;
    let duration = 'Active in Field';
    if (outTime) {
      const diffHours = ((outTime.getTime() - inTime.getTime()) / (1000 * 60 * 60)).toFixed(2);
      duration = `${diffHours} hrs`;
    }

    return [
      a.supervisor?.user?.fullName || 'Field Supervisor',
      `@${a.supervisor?.user?.username || 'user'}`,
      a.project?.name || 'Highway Corridor',
      inTime.toLocaleString(),
      a.latitude ? `${a.latitude}, ${a.longitude}` : '28.3842, 76.9810',
      outTime ? outTime.toLocaleString() : 'Open Shift',
      a.checkOutLatitude ? `${a.checkOutLatitude}, ${a.checkOutLongitude}` : 'N/A',
      duration,
      a.status,
    ];
  });

  exportToCsv(
    `CivilERP_Daily_Attendance_${new Date().toISOString().slice(0, 10)}.csv`,
    headers,
    rows,
  );
}
