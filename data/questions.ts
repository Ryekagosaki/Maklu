export type Difficulty = "easy" | "medium" | "hard";

export interface Question {
  id: string;
  language: string;
  languageSlug: string;
  difficulty: Difficulty;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  coins: number;
}

export const questions: Question[] = [
  // ===== PYTHON =====
  { id: "py-e1", language: "Python", languageSlug: "python", difficulty: "easy", question: "Apa output dari: print(type(10))?", options: ["<class 'int'>", "<class 'num'>", "<class 'integer'>", "<class 'float'>"], correct: 0, explanation: "Tipe data 10 adalah integer, maka type() mengembalikan <class 'int'>", coins: 10 },
  { id: "py-e2", language: "Python", languageSlug: "python", difficulty: "easy", question: "Bagaimana cara membuat list kosong di Python?", options: ["list = []", "list = {}", "list = ()", "list = <>" ], correct: 0, explanation: "List kosong dibuat dengan [] atau list()", coins: 10 },
  { id: "py-e3", language: "Python", languageSlug: "python", difficulty: "easy", question: "Fungsi apa yang digunakan untuk mendapatkan panjang list?", options: ["length()", "len()", "size()", "count()"], correct: 1, explanation: "len() adalah fungsi built-in untuk mengukur panjang sequence di Python", coins: 10 },
  { id: "py-m1", language: "Python", languageSlug: "python", difficulty: "medium", question: "Apa hasil dari: [x**2 for x in range(5)]?", options: ["[0, 1, 4, 9, 16]", "[1, 4, 9, 16, 25]", "[0, 1, 2, 3, 4]", "[0, 2, 4, 6, 8]"], correct: 0, explanation: "List comprehension ini mengkuadratkan setiap angka dari 0 sampai 4", coins: 20 },
  { id: "py-m2", language: "Python", languageSlug: "python", difficulty: "medium", question: "Apa itu decorator di Python?", options: ["Fungsi yang memodifikasi fungsi lain", "Library untuk desain UI", "Tipe data khusus", "Metode untuk membuat class"], correct: 0, explanation: "Decorator adalah fungsi yang membungkus dan memodifikasi behavior fungsi lain menggunakan @syntax", coins: 20 },
  { id: "py-h1", language: "Python", languageSlug: "python", difficulty: "hard", question: "Apa perbedaan antara *args dan **kwargs?", options: ["*args untuk positional args tuple, **kwargs untuk keyword args dict", "*args untuk keyword args, **kwargs untuk positional args", "Keduanya sama saja", "*args untuk list, **kwargs untuk set"], correct: 0, explanation: "*args menerima positional arguments sebagai tuple, **kwargs menerima keyword arguments sebagai dictionary", coins: 30 },
  { id: "py-h2", language: "Python", languageSlug: "python", difficulty: "hard", question: "Bagaimana cara kerja GIL (Global Interpreter Lock) di Python?", options: ["Hanya satu thread yang bisa eksekusi Python bytecode pada waktu bersamaan", "Semua thread bisa berjalan bersamaan tanpa batasan", "GIL mengatur memory allocation", "GIL adalah framework untuk async programming"], correct: 0, explanation: "GIL adalah mutex yang mencegah multiple threads mengeksekusi Python bytecode secara bersamaan, membatasi true parallelism", coins: 30 },

  // ===== JAVASCRIPT =====
  { id: "js-e1", language: "JavaScript", languageSlug: "javascript", difficulty: "easy", question: "Apa output dari: typeof 'hello'?", options: ["string", "String", "text", "char"], correct: 0, explanation: "typeof operator pada string mengembalikan 'string' (lowercase)", coins: 10 },
  { id: "js-e2", language: "JavaScript", languageSlug: "javascript", difficulty: "easy", question: "Bagaimana cara mendeklarasikan variabel konstanta di JavaScript?", options: ["const x = 5", "constant x = 5", "final x = 5", "let const x = 5"], correct: 0, explanation: "Keyword const digunakan untuk mendeklarasikan konstanta yang tidak bisa di-reassign", coins: 10 },
  { id: "js-e3", language: "JavaScript", languageSlug: "javascript", difficulty: "easy", question: "Apa itu arrow function di JavaScript?", options: ["Fungsi dengan sintaks => yang lebih pendek", "Fungsi yang berjalan lebih cepat", "Fungsi untuk DOM manipulation", "Fungsi async"], correct: 0, explanation: "Arrow function (=>) adalah cara penulisan fungsi yang lebih singkat dengan lexical this binding", coins: 10 },
  { id: "js-m1", language: "JavaScript", languageSlug: "javascript", difficulty: "medium", question: "Apa perbedaan == dan === di JavaScript?", options: ["== hanya cek nilai, === cek nilai dan tipe data", "Tidak ada bedanya", "=== lebih lambat dari ==", "== untuk string, === untuk angka"], correct: 0, explanation: "== (loose equality) melakukan type coercion, sedangkan === (strict equality) memeriksa nilai dan tipe secara ketat", coins: 20 },
  { id: "js-m2", language: "JavaScript", languageSlug: "javascript", difficulty: "medium", question: "Apa yang dimaksud dengan closure di JavaScript?", options: ["Fungsi yang mengakses variabel dari scope luar", "Cara untuk menutup koneksi", "Method untuk menutup window", "Cara menutup loop"], correct: 0, explanation: "Closure adalah fungsi yang 'mengingat' dan mengakses variabel dari enclosing scope meskipun fungsi tersebut dieksekusi di luar scope tersebut", coins: 20 },
  { id: "js-h1", language: "JavaScript", languageSlug: "javascript", difficulty: "hard", question: "Apa output dari: console.log(0.1 + 0.2 === 0.3)?", options: ["false", "true", "Error", "undefined"], correct: 0, explanation: "Karena floating-point arithmetic, 0.1 + 0.2 = 0.30000000000000004, bukan 0.3, sehingga hasilnya false", coins: 30 },
  { id: "js-h2", language: "JavaScript", languageSlug: "javascript", difficulty: "hard", question: "Apa itu event loop di JavaScript?", options: ["Mekanisme yang memungkinkan JS single-thread menangani operasi async", "Perulangan untuk event handling", "Library untuk animasi", "DOM event system"], correct: 0, explanation: "Event loop adalah mekanisme yang mengeksekusi call stack, memproses callback queue, dan memungkinkan non-blocking I/O di JavaScript single-threaded", coins: 30 },

  // ===== JAVA =====
  { id: "java-e1", language: "Java", languageSlug: "java", difficulty: "easy", question: "Apa keyword untuk membuat class di Java?", options: ["class", "Class", "define", "struct"], correct: 0, explanation: "Keyword 'class' (lowercase) digunakan untuk mendefinisikan class di Java", coins: 10 },
  { id: "java-e2", language: "Java", languageSlug: "java", difficulty: "easy", question: "Apa tipe data primitif untuk bilangan bulat di Java?", options: ["int", "integer", "num", "whole"], correct: 0, explanation: "int adalah tipe data primitif 32-bit untuk bilangan bulat di Java", coins: 10 },
  { id: "java-m1", language: "Java", languageSlug: "java", difficulty: "medium", question: "Apa perbedaan antara abstract class dan interface di Java?", options: ["Abstract class bisa punya method implementasi, interface (pre-Java 8) tidak", "Keduanya sama saja", "Interface bisa punya constructor", "Abstract class tidak bisa diextend"], correct: 0, explanation: "Abstract class bisa punya method dengan implementasi dan state, interface awalnya hanya deklarasi method (meskipun Java 8+ mendukung default methods)", coins: 20 },
  { id: "java-h1", language: "Java", languageSlug: "java", difficulty: "hard", question: "Apa itu Java memory model dan happens-before relationship?", options: ["Spesifikasi yang mendefinisikan bagaimana thread berinteraksi melalui memory, dan happens-before menjamin urutan visibility", "Model untuk garbage collection", "Framework untuk memory management manual", "API untuk mengalokasikan heap memory"], correct: 0, explanation: "Java Memory Model mendefinisikan aturan visibility antar thread. Happens-before adalah relasi yang menjamin action A terlihat oleh action B jika A happens-before B", coins: 30 },

  // ===== C =====
  { id: "c-e1", language: "C", languageSlug: "c", difficulty: "easy", question: "Apa fungsi yang digunakan untuk mencetak output di C?", options: ["printf()", "print()", "cout", "System.out.println()"], correct: 0, explanation: "printf() dari stdio.h adalah fungsi standar untuk formatted output di C", coins: 10 },
  { id: "c-e2", language: "C", languageSlug: "c", difficulty: "easy", question: "Apa itu pointer di C?", options: ["Variabel yang menyimpan alamat memori", "Tipe data untuk string", "Fungsi built-in", "Cara untuk include library"], correct: 0, explanation: "Pointer adalah variabel yang nilainya adalah alamat memori dari variabel lain", coins: 10 },
  { id: "c-m1", language: "C", languageSlug: "c", difficulty: "medium", question: "Apa perbedaan malloc() dan calloc()?", options: ["calloc() menginisialisasi memori ke 0, malloc() tidak", "Keduanya sama saja", "malloc() untuk array, calloc() untuk single value", "calloc() lebih cepat"], correct: 0, explanation: "malloc() mengalokasikan memori tanpa inisialisasi, calloc() mengalokasikan dan menginisialisasi semua byte ke 0", coins: 20 },
  { id: "c-h1", language: "C", languageSlug: "c", difficulty: "hard", question: "Apa yang dimaksud dengan undefined behavior di C?", options: ["Perilaku program yang tidak terdefinisi oleh C standard dan bisa berbeda di setiap compiler", "Error yang selalu menyebabkan crash", "Behavior dari fungsi yang belum diimplementasi", "Kondisi race condition"], correct: 0, explanation: "Undefined behavior (UB) adalah operasi yang tidak didefinisikan oleh C standard. Compiler boleh mengoptimasi dengan asumsi UB tidak terjadi, menyebabkan bug yang sulit diprediksi", coins: 30 },

  // ===== RUST =====
  { id: "rs-e1", language: "Rust", languageSlug: "rust", difficulty: "easy", question: "Apa keyword untuk mendeklarasikan variabel mutable di Rust?", options: ["let mut", "var", "mut let", "mutable"], correct: 0, explanation: "Di Rust, variabel immutable by default. Gunakan 'let mut' untuk membuat variabel yang bisa diubah", coins: 10 },
  { id: "rs-m1", language: "Rust", languageSlug: "rust", difficulty: "medium", question: "Apa yang dimaksud dengan ownership di Rust?", options: ["Setiap nilai punya satu pemilik, dan nilai di-drop saat pemiliknya out of scope", "System untuk mengatur akses file", "OOP concept untuk enkapsulasi", "Memory management via garbage collector"], correct: 0, explanation: "Ownership adalah sistem inti Rust untuk memory safety. Setiap nilai memiliki satu owner, dan ketika owner keluar scope, nilai di-drop secara otomatis", coins: 20 },
  { id: "rs-h1", language: "Rust", languageSlug: "rust", difficulty: "hard", question: "Apa perbedaan antara Box<T>, Rc<T>, dan Arc<T> di Rust?", options: ["Box<T> untuk heap allocation single owner, Rc<T> untuk single-thread shared ownership, Arc<T> untuk multi-thread shared ownership", "Ketiganya sama", "Box lebih cepat dari keduanya untuk semua use case", "Arc digunakan untuk async, Box untuk sync"], correct: 0, explanation: "Box<T> adalah smart pointer untuk heap allocation dengan single owner. Rc<T> menggunakan reference counting untuk shared ownership di single thread. Arc<T> adalah atomic Rc untuk multi-threaded context", coins: 30 },

  // ===== GO =====
  { id: "go-e1", language: "Go", languageSlug: "go", difficulty: "easy", question: "Bagaimana cara mendeklarasikan variabel di Go menggunakan short declaration?", options: ["x := 5", "var x = 5", "let x = 5", "int x = 5"], correct: 0, explanation: ":= adalah short variable declaration di Go yang menginfer tipe dari nilai", coins: 10 },
  { id: "go-m1", language: "Go", languageSlug: "go", difficulty: "medium", question: "Apa itu goroutine di Go?", options: ["Lightweight thread yang dikelola Go runtime", "Tipe data khusus Go", "Package untuk concurrent programming", "Method untuk error handling"], correct: 0, explanation: "Goroutine adalah fungsi yang berjalan secara concurrent. Dikelola oleh Go runtime, sangat lightweight dibanding OS thread", coins: 20 },
  { id: "go-h1", language: "Go", languageSlug: "go", difficulty: "hard", question: "Apa perbedaan antara channel buffered dan unbuffered di Go?", options: ["Unbuffered memblokir sampai receiver siap, buffered memiliki kapasitas antrian", "Buffered lebih cepat dalam semua situasi", "Keduanya sama dalam hal blocking behavior", "Unbuffered tidak bisa digunakan dengan goroutine"], correct: 0, explanation: "Unbuffered channel memblokir sender sampai receiver siap (synchronous). Buffered channel punya kapasitas, sender tidak diblokir sampai buffer penuh", coins: 30 },

  // ===== TYPESCRIPT =====
  { id: "ts-e1", language: "TypeScript", languageSlug: "typescript", difficulty: "easy", question: "Apa itu TypeScript?", options: ["Superset JavaScript dengan static typing", "Framework JavaScript", "Versi terbaru JavaScript", "Library untuk type checking"], correct: 0, explanation: "TypeScript adalah superset JavaScript yang menambahkan static typing. Dikompilasi ke JavaScript.", coins: 10 },
  { id: "ts-m1", language: "TypeScript", languageSlug: "typescript", difficulty: "medium", question: "Apa perbedaan antara interface dan type alias di TypeScript?", options: ["Interface bisa di-extend dan di-merge, type alias lebih fleksibel untuk union/intersection types", "Keduanya identik", "Type alias lebih powerful", "Interface hanya untuk class"], correct: 0, explanation: "Interface mendukung declaration merging dan lebih cocok untuk object shapes. Type alias lebih fleksibel untuk union, intersection, dan tipe kompleks", coins: 20 },
  { id: "ts-h1", language: "TypeScript", languageSlug: "typescript", difficulty: "hard", question: "Apa itu conditional types di TypeScript?", options: ["Type yang ditentukan berdasarkan kondisi: T extends U ? X : Y", "If-else dalam tipe", "Type yang berubah saat runtime", "Generic type dengan batasan"], correct: 0, explanation: "Conditional types mengikuti pola T extends U ? X : Y, memungkinkan tipe yang berbeda berdasarkan kondisi type relationship", coins: 30 },

  // ===== C++ =====
  { id: "cpp-e1", language: "C++", languageSlug: "cpp", difficulty: "easy", question: "Apa keyword untuk mendeklarasikan class di C++?", options: ["class", "struct", "object", "type"], correct: 0, explanation: "Keyword 'class' digunakan untuk mendefinisikan class di C++. Perbedaan dengan struct: default access C++ class adalah private", coins: 10 },
  { id: "cpp-m1", language: "C++", languageSlug: "cpp", difficulty: "medium", question: "Apa itu virtual function di C++?", options: ["Fungsi yang bisa di-override di derived class untuk polymorphism", "Fungsi yang tidak diimplementasikan", "Fungsi yang berjalan di virtual machine", "Template function"], correct: 0, explanation: "Virtual function memungkinkan polymorphism runtime. Dengan virtual, pointer base class memanggil implementasi di derived class", coins: 20 },
  { id: "cpp-h1", language: "C++", languageSlug: "cpp", difficulty: "hard", question: "Apa itu RAII (Resource Acquisition Is Initialization) di C++?", options: ["Idiom di mana resource dikaitkan dengan object lifetime, di-release di destructor", "API untuk allocasi resource", "Framework untuk memory management", "Pattern untuk thread safety"], correct: 0, explanation: "RAII mengikat resource (memori, file, mutex) ke lifetime object. Constructor mengakuisisi resource, destructor melepasnya, memastikan tidak ada resource leak", coins: 30 },

  // ===== SQL =====
  { id: "sql-e1", language: "SQL", languageSlug: "sql", difficulty: "easy", question: "Apa perintah untuk mengambil semua data dari tabel?", options: ["SELECT * FROM table", "GET ALL FROM table", "FETCH table", "READ * table"], correct: 0, explanation: "SELECT * FROM table_name mengambil semua kolom dan baris dari tabel", coins: 10 },
  { id: "sql-e2", language: "SQL", languageSlug: "sql", difficulty: "easy", question: "Apa perintah untuk menambah data baru ke tabel?", options: ["INSERT INTO", "ADD TO", "PUT INTO", "CREATE IN"], correct: 0, explanation: "INSERT INTO table_name (kolom) VALUES (nilai) untuk menambahkan baris baru", coins: 10 },
  { id: "sql-m1", language: "SQL", languageSlug: "sql", difficulty: "medium", question: "Apa perbedaan INNER JOIN dan LEFT JOIN?", options: ["INNER JOIN hanya baris yang match, LEFT JOIN semua baris tabel kiri + match kanan", "Keduanya sama saja", "LEFT JOIN lebih cepat", "INNER JOIN untuk 3+ tabel"], correct: 0, explanation: "INNER JOIN mengembalikan baris yang ada di kedua tabel. LEFT JOIN mengembalikan semua baris tabel kiri, dan match dari tabel kanan (NULL jika tidak match)", coins: 20 },
  { id: "sql-h1", language: "SQL", languageSlug: "sql", difficulty: "hard", question: "Apa itu window function di SQL?", options: ["Fungsi yang melakukan kalkulasi pada set baris yang terkait dengan baris saat ini tanpa collapse-nya", "Fungsi untuk mengatur tampilan window", "Stored procedure khusus", "Fungsi untuk partisi tabel"], correct: 0, explanation: "Window functions (OVER clause) melakukan kalkulasi seperti agregasi pada 'window' baris terkait, tanpa menggabungkan baris seperti GROUP BY", coins: 30 },

  // ===== PHP =====
  { id: "php-e1", language: "PHP", languageSlug: "php", difficulty: "easy", question: "Bagaimana cara memulai blok PHP?", options: ["<?php", "<php>", "<?", "<script php>"], correct: 0, explanation: "Tag pembuka standar PHP adalah <?php. Tag pendek <? juga bisa tapi tidak direkomendasikan", coins: 10 },
  { id: "php-m1", language: "PHP", languageSlug: "php", difficulty: "medium", question: "Apa perbedaan echo dan print di PHP?", options: ["echo bisa output multiple values, print hanya satu dan return 1", "Tidak ada perbedaan", "print lebih cepat", "echo hanya untuk HTML"], correct: 0, explanation: "echo dapat mencetak multiple string dipisah koma dan tidak return nilai. print hanya mencetak satu string dan selalu return 1", coins: 20 },

  // ===== KOTLIN =====
  { id: "kt-e1", language: "Kotlin", languageSlug: "kotlin", difficulty: "easy", question: "Apa perbedaan val dan var di Kotlin?", options: ["val untuk immutable, var untuk mutable", "val lebih cepat dari var", "Var untuk primitive, val untuk object", "Tidak ada perbedaan"], correct: 0, explanation: "val adalah read-only (immutable reference), var adalah mutable. Gunakan val sebisa mungkin untuk code yang lebih aman", coins: 10 },
  { id: "kt-m1", language: "Kotlin", languageSlug: "kotlin", difficulty: "medium", question: "Apa itu null safety di Kotlin?", options: ["Sistem type yang membedakan nullable dan non-null types, mencegah NullPointerException", "Framework untuk handle null values", "Garbage collector feature", "Java compatibility layer"], correct: 0, explanation: "Kotlin type system membedakan nullable (String?) dan non-null (String) types. Compiler memaksa penanganan null, mencegah NPE", coins: 20 },

  // ===== SWIFT =====
  { id: "sw-e1", language: "Swift", languageSlug: "swift", difficulty: "easy", question: "Apa keyword untuk optional value di Swift?", options: ["?", "Optional", "maybe", "nil?"], correct: 0, explanation: "Tanda ? setelah tipe (misal String?) mendeklarasikan optional yang bisa bernilai nil", coins: 10 },
  { id: "sw-m1", language: "Swift", languageSlug: "swift", difficulty: "medium", question: "Apa itu optional chaining di Swift?", options: ["Mengakses properti/method dari optional, mengembalikan nil jika optional adalah nil", "Cara untuk link multiple optionals", "Error handling mechanism", "Cara merangkai string optionals"], correct: 0, explanation: "Optional chaining (obj?.property?.method()) memungkinkan akses bertingkat ke optional values. Jika salah satu nil, seluruh ekspresi menghasilkan nil", coins: 20 },

  // ===== DART =====
  { id: "dt-e1", language: "Dart", languageSlug: "dart", difficulty: "easy", question: "Apa framework populer yang menggunakan Dart?", options: ["Flutter", "React", "Angular", "Vue"], correct: 0, explanation: "Flutter adalah UI framework dari Google yang menggunakan Dart untuk membuat aplikasi cross-platform", coins: 10 },

  // ===== HTML =====
  { id: "html-e1", language: "HTML", languageSlug: "html", difficulty: "easy", question: "Tag apa yang digunakan untuk membuat heading terbesar di HTML?", options: ["<h1>", "<heading>", "<h6>", "<title>"], correct: 0, explanation: "<h1> adalah tag heading terbesar. HTML memiliki 6 level heading dari h1 (terbesar) hingga h6 (terkecil)", coins: 10 },
  { id: "html-e2", language: "HTML", languageSlug: "html", difficulty: "easy", question: "Apa kepanjangan dari HTML?", options: ["HyperText Markup Language", "HighText Machine Language", "HyperText and links Markup Language", "HyperTool Markup Language"], correct: 0, explanation: "HTML = HyperText Markup Language, bahasa standar untuk membuat halaman web", coins: 10 },
  { id: "html-m1", language: "HTML", languageSlug: "html", difficulty: "medium", question: "Apa perbedaan antara <div> dan <span>?", options: ["div adalah block element, span adalah inline element", "Keduanya sama", "span lebih besar dari div", "div untuk CSS, span untuk JS"], correct: 0, explanation: "<div> adalah block-level element yang mengambil full width. <span> adalah inline element yang hanya mengambil ruang sebesar kontennya", coins: 20 },

  // ===== CSS =====
  { id: "css-e1", language: "CSS", languageSlug: "css", difficulty: "easy", question: "Apa property CSS untuk mengubah warna teks?", options: ["color", "text-color", "font-color", "foreground"], correct: 0, explanation: "Property 'color' digunakan untuk mengatur warna teks dalam CSS", coins: 10 },
  { id: "css-m1", language: "CSS", languageSlug: "css", difficulty: "medium", question: "Apa itu CSS Flexbox?", options: ["Layout model 1D untuk mendistribusikan space antar items dalam container", "Property untuk animasi", "System untuk responsive grid", "Framework CSS"], correct: 0, explanation: "Flexbox adalah layout model 1-dimensional untuk mendistribusikan item dalam baris atau kolom dengan kontrol alignment yang kuat", coins: 20 },
  { id: "css-h1", language: "CSS", languageSlug: "css", difficulty: "hard", question: "Apa perbedaan antara CSS Grid dan Flexbox?", options: ["Grid adalah layout 2D (baris+kolom), Flexbox 1D (baris ATAU kolom)", "Grid hanya untuk columns, Flexbox untuk rows", "Tidak ada perbedaan fungsional", "Grid lebih baru dan menggantikan Flexbox sepenuhnya"], correct: 0, explanation: "CSS Grid dirancang untuk layout 2D (kontrol baris dan kolom bersamaan). Flexbox dirancang untuk layout 1D (satu arah pada satu waktu)", coins: 30 },

  // ===== RUBY =====
  { id: "rb-e1", language: "Ruby", languageSlug: "ruby", difficulty: "easy", question: "Apa keyword untuk mendefinisikan method di Ruby?", options: ["def", "function", "func", "method"], correct: 0, explanation: "Keyword 'def' digunakan untuk mendefinisikan method di Ruby", coins: 10 },

  // ===== SCALA =====
  { id: "sc-e1", language: "Scala", languageSlug: "scala", difficulty: "easy", question: "Scala berjalan di atas apa?", options: ["JVM (Java Virtual Machine)", "V8 Engine", ".NET Runtime", "Python Interpreter"], correct: 0, explanation: "Scala berjalan di atas JVM, sehingga bisa berinteroperasi dengan kode Java", coins: 10 },

  // ===== HASKELL =====
  { id: "hs-e1", language: "Haskell", languageSlug: "haskell", difficulty: "easy", question: "Haskell adalah bahasa pemrograman jenis apa?", options: ["Purely functional", "Object-oriented", "Procedural", "Imperative"], correct: 0, explanation: "Haskell adalah bahasa fungsional murni (purely functional) dengan lazy evaluation dan strong static typing", coins: 10 },

  // ===== REGEX =====
  { id: "rgx-e1", language: "Regex", languageSlug: "regex", difficulty: "easy", question: "Apa arti '.' dalam regex?", options: ["Mencocokkan karakter apapun kecuali newline", "Titik literal", "Akhir string", "Awal string"], correct: 0, explanation: "Titik (.) dalam regex adalah wildcard yang mencocokkan karakter apapun kecuali newline (\\n)", coins: 10 },
  { id: "rgx-m1", language: "Regex", languageSlug: "regex", difficulty: "medium", question: "Apa perbedaan antara '+' dan '*' di regex?", options: ["+ mencocokkan 1 atau lebih, * mencocokkan 0 atau lebih", "Tidak ada perbedaan", "* mencocokkan tepat satu, + dua atau lebih", "+ untuk angka, * untuk huruf"], correct: 0, explanation: "* (asterisk) mencocokkan 0 atau lebih kemunculan. + (plus) mencocokkan 1 atau lebih kemunculan", coins: 20 },

  // ===== BASH =====
  { id: "sh-e1", language: "Bash", languageSlug: "bash", difficulty: "easy", question: "Apa command untuk menampilkan teks di terminal?", options: ["echo", "print", "say", "display"], correct: 0, explanation: "echo adalah command untuk menampilkan teks/string ke stdout di shell", coins: 10 },
  { id: "sh-m1", language: "Bash", languageSlug: "bash", difficulty: "medium", question: "Apa itu shebang (#!) di bash script?", options: ["Baris pertama yang menentukan interpreter untuk script", "Komentar khusus", "Variable declaration", "Deklarasi fungsi"], correct: 0, explanation: "Shebang (#!) adalah baris pertama script yang memberitahu OS interpreter mana yang harus digunakan, misal #!/bin/bash", coins: 20 },

  // ===== SOLIDITY =====
  { id: "sol-e1", language: "Solidity", languageSlug: "solidity", difficulty: "easy", question: "Solidity digunakan untuk membuat apa?", options: ["Smart contracts di Ethereum", "Backend API", "Mobile apps", "Database queries"], correct: 0, explanation: "Solidity adalah bahasa yang dirancang khusus untuk menulis smart contracts yang berjalan di Ethereum Virtual Machine (EVM)", coins: 10 },

  // ===== LUA =====
  { id: "lua-e1", language: "Lua", languageSlug: "lua", difficulty: "easy", question: "Lua paling banyak digunakan untuk?", options: ["Game scripting dan embedded systems", "Web development", "Data science", "Mobile apps"], correct: 0, explanation: "Lua dirancang sebagai bahasa scripting yang ringan untuk di-embed di aplikasi, terutama game seperti Roblox, World of Warcraft", coins: 10 },

  // ===== ELIXIR =====
  { id: "ex-e1", language: "Elixir", languageSlug: "elixir", difficulty: "easy", question: "Elixir berjalan di atas apa?", options: ["BEAM (Erlang VM)", "JVM", "CLR", "V8"], correct: 0, explanation: "Elixir berjalan di atas BEAM (Bogdan/Björn's Erlang Abstract Machine), mewarisi concurrency dan fault-tolerance dari Erlang", coins: 10 },

  // ===== R =====
  { id: "r-e1", language: "R", languageSlug: "r", difficulty: "easy", question: "R terutama digunakan untuk?", options: ["Statistical computing dan data analysis", "Web development", "System programming", "Game development"], correct: 0, explanation: "R adalah bahasa yang dirancang khusus untuk komputasi statistik, analisis data, dan visualisasi data", coins: 10 },

  // ===== JULIA =====
  { id: "jl-e1", language: "Julia", languageSlug: "julia", difficulty: "easy", question: "Apa keunggulan utama Julia dibanding Python untuk scientific computing?", options: ["Performa jauh lebih cepat mendekati C", "Syntax yang lebih mudah", "Lebih banyak library", "Support mobile"], correct: 0, explanation: "Julia dirancang untuk high-performance scientific computing. Dengan JIT compilation, Julia bisa mendekati kecepatan C/Fortran", coins: 10 },

  // ===== WebAssembly =====
  { id: "wasm-e1", language: "WebAssembly", languageSlug: "wasm", difficulty: "easy", question: "WebAssembly (WASM) digunakan untuk?", options: ["Menjalankan kode berperforma tinggi di browser", "Menulis web markup", "Styling halaman web", "Database queries"], correct: 0, explanation: "WebAssembly adalah format bytecode binary yang memungkinkan kode dari bahasa seperti C, C++, Rust berjalan dengan performa native di browser", coins: 10 },

  // ===== SCRATCH =====
  { id: "scr-e1", language: "Scratch", languageSlug: "scratch", difficulty: "easy", question: "Scratch dikembangkan oleh siapa?", options: ["MIT Media Lab", "Google", "Microsoft", "Apple"], correct: 0, explanation: "Scratch dikembangkan oleh MIT Media Lab sebagai bahasa pemrograman visual untuk mengajarkan coding kepada anak-anak", coins: 10 },

  // ===== GENERAL QUESTIONS =====
  { id: "gen-e1", language: "General", languageSlug: "general", difficulty: "easy", question: "Bahasa pemrograman mana yang paling populer untuk AI/Machine Learning?", options: ["Python", "Java", "C++", "PHP"], correct: 0, explanation: "Python mendominasi AI/ML berkat ekosistem library seperti TensorFlow, PyTorch, scikit-learn", coins: 10 },
  { id: "gen-e2", language: "General", languageSlug: "general", difficulty: "easy", question: "Apa kepanjangan dari OOP?", options: ["Object-Oriented Programming", "Open Object Protocol", "Ordered Operation Process", "Online Object Platform"], correct: 0, explanation: "OOP (Object-Oriented Programming) adalah paradigma pemrograman berbasis objek yang mengenkapsulasi data dan perilaku", coins: 10 },
  { id: "gen-m1", language: "General", languageSlug: "general", difficulty: "medium", question: "Apa perbedaan compiled dan interpreted language?", options: ["Compiled diterjemahkan ke machine code sebelum runtime, interpreted diterjemahkan saat runtime", "Compiled lebih baru", "Interpreted lebih aman", "Tidak ada perbedaan performa"], correct: 0, explanation: "Compiled languages (C, Rust) menghasilkan machine code sebelum dijalankan. Interpreted languages (Python, JavaScript) diterjemahkan saat program berjalan", coins: 20 },
  { id: "gen-h1", language: "General", languageSlug: "general", difficulty: "hard", question: "Apa perbedaan antara concurrency dan parallelism?", options: ["Concurrency menangani banyak tugas yang bisa overlap, parallelism mengeksekusi beberapa tugas secara simultan", "Keduanya sama", "Parallelism hanya untuk multi-core", "Concurrency lebih cepat selalu"], correct: 0, explanation: "Concurrency adalah tentang struktur program untuk menangani multiple tasks yang dapat progress secara overlap. Parallelism adalah eksekusi fisik simultan pada multiple processors", coins: 30 },
];

export const getQuestionsByLanguage = (slug: string, difficulty?: Difficulty): Question[] => {
  let filtered = questions.filter(q => q.languageSlug === slug || q.languageSlug === "general");
  if (difficulty) filtered = filtered.filter(q => q.difficulty === difficulty);
  return filtered;
};

export const getRandomQuestions = (difficulty: Difficulty, count: number = 10): Question[] => {
  const filtered = questions.filter(q => q.difficulty === difficulty);
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export const getAllQuestions = (difficulty: Difficulty): Question[] => {
  return questions.filter(q => q.difficulty === difficulty);
};
