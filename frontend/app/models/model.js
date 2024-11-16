angular.module('recipes').factory('UserModel', function() {
    return {
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        errors: [], // Menyimpan pesan error

        // Fungsi validasi
        validate: function() {
            let errors = [];
            if (!this.name) errors.push({ field: 'name', message: 'Full name is required' });
            if (!this.email || !/\S+@\S+\.\S+/.test(this.email)) errors.push({ field: 'email', message: 'Invalid email' });
            if (!this.phoneNumber || !/^\d+$/.test(this.phoneNumber)) errors.push({ field: 'phoneNumber', message: 'Phone number must be numeric' });
            if (!this.password || this.password.length < 6) errors.push({ field: 'password', message: 'Password must be at least 6 characters long' });
            this.errors = errors;  // Simpan error ke dalam model
            return errors;
        },

        // Menghapus error ketika field diperbaiki
        clearError: function(field) {
            this.errors = this.errors.filter(error => error.field !== field);
        }
    };
});
