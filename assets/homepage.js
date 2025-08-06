let len = window.drive_names.length;
let html = "";

// Function to handle folder click with password protection
function handleFolderClick(folderIndex, folderName) {
    console.log('DEBUG Homepage: Folder clicked:', folderIndex, folderName);
    console.log('DEBUG Homepage: Password protected folders:', window.password_protected_folders);
    console.log('DEBUG Homepage: Is password required:', window.password_protected_folders && window.password_protected_folders[folderIndex]);
    
    // Check if folder requires password
    if (window.password_protected_folders && window.password_protected_folders[folderIndex]) {
        console.log('DEBUG Homepage: Showing password modal');
        showPasswordModal(folderIndex, folderName);
    } else {
        console.log('DEBUG Homepage: No password required, redirecting directly');
        window.location.href = `/${folderIndex}:/`;
    }
}

// Function to show password modal
function showPasswordModal(folderIndex, folderName) {
    const modalHtml = `
        <div class="modal fade" id="passwordModal" tabindex="-1" aria-labelledby="passwordModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content bg-dark">
                    <div class="modal-header">
                        <h5 class="modal-title text-white" id="passwordModalLabel">Enter Password for ${folderName}</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="folderPassword" class="form-label text-white">Password</label>
                            <input type="password" class="form-control" id="folderPassword" placeholder="Enter folder password">
                        </div>
                        <div id="passwordError" class="alert alert-danger d-none" role="alert">
                            Incorrect password. Please try again.
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" onclick="verifyFolderPassword(${folderIndex}, '${folderName}')">Access Folder</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    $('#passwordModal').remove();
    
    // Add modal to body
    $('body').append(modalHtml);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('passwordModal'));
    modal.show();
    
    // Focus on password input
    $('#passwordModal').on('shown.bs.modal', function () {
        $('#folderPassword').focus();
    });
    
    // Handle Enter key
    $('#folderPassword').on('keypress', function(e) {
        if (e.which === 13) {
            verifyFolderPassword(folderIndex, folderName);
        }
    });
}

// Function to verify folder password
function verifyFolderPassword(folderIndex, folderName) {
    const password = $('#folderPassword').val();
    
    console.log('DEBUG Homepage: Verifying password for folder', folderIndex, folderName);
    console.log('DEBUG Homepage: Password length:', password ? password.length : 0);
    
    if (!password) {
        $('#passwordError').text('Please enter a password.').removeClass('d-none');
        return;
    }
    
    // Store password for this session
    sessionStorage.setItem(`folder_password_${folderIndex}`, password);
    console.log('DEBUG Homepage: Password stored in sessionStorage');
    
    // Hide modal and redirect
    const modal = bootstrap.Modal.getInstance(document.getElementById('passwordModal'));
    modal.hide();
    
    console.log('DEBUG Homepage: Redirecting to folder');
    window.location.href = `/${folderIndex}:/`;
}

for (let i = 0; i < len; i++) {
   html +=
      `<a href="#" onclick="handleFolderClick(${i}, '${window.drive_names[i]}')" style="color: white;" class="list-group-item list-group-item-action">
         <svg width="1.5em" height="1.5em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <linearGradient id="WQEfvoQAcpQgQgyjQQ4Hqa" x1="24" x2="24" y1="6.708" y2="14.977" gradientUnits="userSpaceOnUse">
               <stop offset="0" stop-color="#eba600"></stop>
               <stop offset="1" stop-color="#c28200"></stop>
            </linearGradient>
            <path fill="url(#WQEfvoQAcpQgQgyjQQ4Hqa)" d="M24.414,10.414l-2.536-2.536C21.316,7.316,20.553,7,19.757,7L5,7C3.895,7,3,7.895,3,9l0,30 c0,1.105,0.895,2,2,2l38,0c1.105,0,2-0.895,2-2V13c0-1.105-0.895-2-2-2l-17.172,0C25.298,11,24.789,10.789,24.414,10.414z"></path>
            <linearGradient id="WQEfvoQAcpQgQgyjQQ4Hqb" x1="24" x2="24" y1="10.854" y2="40.983" gradientUnits="userSpaceOnUse">
               <stop offset="0" stop-color="#ffd869"></stop>
               <stop offset="1" stop-color="#fec52b"></stop>
            </linearGradient>
            <path fill="url(#WQEfvoQAcpQgQgyjQQ4Hqb)" d="M21.586,14.414l3.268-3.268C24.947,11.053,25.074,11,25.207,11H43c1.105,0,2,0.895,2,2v26	c0,1.105-0.895,2-2,2H5c-1.105,0-2-0.895-2-2V15.5C3,15.224,3.224,15,3.5,15h16.672C20.702,15,21.211,14.789,21.586,14.414z"></path>
         </svg> ${window.drive_names[i]}
      </a>`;
}

$('#n_drives').html(len);
$('#list').html(html);
